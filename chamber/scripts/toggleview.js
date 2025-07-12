document.addEventListener('DOMContentLoaded', async () => {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const memberContainer = document.getElementById('member-container');
    
    // Load member data
    let members = [];
    try {
        const response = await fetch('data/members.json');
        members = await response.json();
        displayMembers(members, 'grid');
    } catch (error) {
        console.error('Error loading member data:', error);
        memberContainer.innerHTML = '<p class="error">Unable to load member data. Please try again later.</p>';
    }
    
    // View toggle functionality
    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        memberContainer.className = 'grid-view';
        displayMembers(members, 'grid');
    });
    
    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        memberContainer.className = 'list-view';
        displayMembers(members, 'list');
    });
    
    function displayMembers(members, viewType) {
        memberContainer.innerHTML = '';
        
        if (members.length === 0) {
            memberContainer.innerHTML = '<p>No members found.</p>';
            return;
        }
        
        members.forEach(member => {
            const memberElement = document.createElement('article');
            memberElement.className = `member-card ${viewType}-item`;
            
            // Determine membership level
            let membershipLevel = '';
            switch(member.membership) {
                case 1: membershipLevel = 'Member'; break;
                case 2: membershipLevel = 'Silver Member'; break;
                case 3: membershipLevel = 'Gold Member'; break;
                default: membershipLevel = 'Member';
            }
            
            memberElement.innerHTML = `
                <div class="member-image">
                    <img src="images/members/${member.image}" alt="${member.name}" loading="lazy">
                    <span class="membership-badge ${membershipLevel.toLowerCase().replace(' ', '-')}">${membershipLevel}</span>
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="member-address">${member.address}</p>
                    <p class="member-phone">${member.phone}</p>
                    <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="member-website">Visit Website</a>
                    ${member.industry ? `<p class="member-industry">Industry: ${member.industry}</p>` : ''}
                    ${member.services ? `<p class="member-services">Services: ${Array.isArray(member.services) ? member.services.join(', ') : member.services}</p>` : ''}
                </div>
            `;
            
            memberContainer.appendChild(memberElement);
        });
    }
});