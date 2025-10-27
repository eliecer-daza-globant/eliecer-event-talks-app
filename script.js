const talks = [
    {
        title: "The Future of Artificial Intelligence",
        speakers: ["Jane Doe"],
        categories: ["AI", "Machine Learning"],
        description: "A deep dive into the future of AI and its impact on society."
    },
    {
        title: "Building Scalable Web Applications",
        speakers: ["John Smith", "Peter Jones"],
        categories: ["Web Development", "Scalability"],
        description: "Learn how to build web applications that can handle millions of users."
    },
    {
        title: "Cybersecurity in the Modern Age",
        speakers: ["Mary Johnson"],
        categories: ["Cybersecurity"],
        description: "An overview of the latest threats and how to protect your systems."
    },
    {
        title: "The Power of Quantum Computing",
        speakers: ["David Williams"],
        categories: ["Quantum Computing", "Future Tech"],
        description: "Exploring the potential of quantum computers and their applications."
    },
    {
        title: "Frontend Frameworks: A Comparative Analysis",
        speakers: ["Emily Brown", "Michael Davis"],
        categories: ["Web Development", "JavaScript"],
        description: "A look at the most popular frontend frameworks and their pros and cons."
    },
    {
        title: "DevOps and Continuous Delivery",
        speakers: ["Sarah Wilson"],
        categories: ["DevOps", "CI/CD"],
        description: "Best practices for implementing DevOps and continuous delivery in your organization."
    }
];

const scheduleElement = document.getElementById('schedule');
const searchInput = document.getElementById('search');

function renderSchedule(filteredTalks) {
    scheduleElement.innerHTML = '';
    let talkIndex = 0;
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    for (let i = 0; i < 7; i++) {
        if (i === 3) {
            const breakElement = document.createElement('div');
            breakElement.className = 'break';
            const startTime = new Date(currentTime);
            const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
            breakElement.innerHTML = `
                <div class="talk-time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
                <div>Lunch Break</div>
            `;
            scheduleElement.appendChild(breakElement);
            currentTime = endTime;
        } else if (talkIndex < filteredTalks.length) {
            const talk = filteredTalks[talkIndex];
            const talkElement = document.createElement('div');
            talkElement.className = 'talk';

            const startTime = new Date(currentTime);
            const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

            talkElement.innerHTML = `
                <div class="talk-time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
                <div class="talk-title">${talk.title}</div>
                <div class="talk-speakers">By: ${talk.speakers.join(', ')}</div>
                <div class="talk-description">${talk.description}</div>
                <div>
                    ${talk.categories.map(cat => `<span class="talk-category">${cat}</span>`).join('')}
                </div>
            `;
            scheduleElement.appendChild(talkElement);
            currentTime = new Date(endTime.getTime() + 10 * 60 * 1000);
            talkIndex++;
        }
    }
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk =>
        talk.categories.some(cat => cat.toLowerCase().includes(searchTerm))
    );
    renderSchedule(filteredTalks);
});

renderSchedule(talks);
