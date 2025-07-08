document.addEventListener('DOMContentLoaded', () => {
    // Course data array
    const courses = [
        { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true, department: "WDD" },
        { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: true, department: "WDD" },
        { code: "WDD 230", name: "Frontend Development", credits: 3, completed: false, department: "WDD" },
        { code: "WDD 231", name: "Advanced CSS", credits: 3, completed: false, department: "WDD" },
        { code: "WDD 330", name: "Web Frontend Development II", credits: 3, completed: false, department: "WDD" },
        { code: "CSE 111", name: "Programming with Functions", credits: 3, completed: true, department: "CSE" },
        { code: "CSE 121", name: "JavaScript Language", credits: 3, completed: false, department: "CSE" },
        { code: "CSE 210", name: "Programming with Classes", credits: 3, completed: false, department: "CSE" }
    ];

    // DOM Elements
    const coursesContainer = document.querySelector('.courses-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const creditTotalElement = document.querySelector('.credit-total');
    
    // Initial display
    displayCourses(courses);
    updateCreditTotal(courses);

    // Filter buttons event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter courses based on button data-filter
            const filter = button.dataset.filter;
            let filteredCourses = [];
            
            switch(filter) {
                case 'all':
                    filteredCourses = courses;
                    break;
                case 'wdd':
                    filteredCourses = courses.filter(course => course.department === 'WDD');
                    break;
                case 'cse':
                    filteredCourses = courses.filter(course => course.department === 'CSE');
                    break;
                default:
                    filteredCourses = courses;
            }
            
            displayCourses(filteredCourses);
            updateCreditTotal(filteredCourses);
        });
    });

    // Display courses function
    function displayCourses(coursesArray) {
        coursesContainer.innerHTML = '';
        
        if (coursesArray.length === 0) {
            coursesContainer.innerHTML = '<p>No courses found.</p>';
            return;
        }
        
        coursesArray.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
            
            courseCard.innerHTML = `
                <h3>${course.code}</h3>
                <p class="course-name">${course.name}</p>
                <p class="course-credits">${course.credits} credits</p>
                <div class="status-indicator">
                    ${course.completed ? '✓ Completed' : 'In Progress'}
                </div>
            `;
            
            coursesContainer.appendChild(courseCard);
        });
    }

    // Update credit total function
    function updateCreditTotal(coursesArray) {
        const totalCredits = coursesArray.reduce((sum, course) => sum + course.credits, 0);
        creditTotalElement.textContent = `Total Credits: ${totalCredits}`;
    }
});