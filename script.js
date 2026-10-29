
const careerPaths = {
    web: {
        title: "Full-Stack Web Developer",
        description: "Build websites and web applications.",
        stages: [
            {
                name: "Stage 1: Web Fundamentals",
                topics: "HTML, CSS, JavaScript basics",
                project: "Create a personal portfolio website."
            },
            {
                name: "Stage 2: Frontend Development",
                topics: "JavaScript DOM, React, responsive design",
                project: "Build a student dashboard."
            },
            {
                name: "Stage 3: Backend Development",
                topics: "Node.js, Express, REST APIs",
                project: "Build a task management application."
            },
            {
                name: "Stage 4: Database and Deployment",
                topics: "MongoDB, Git, deployment",
                project: "Deploy a full-stack application."
            }
        ]
    },

    data: {
        title: "Data Analyst",
        description: "Turn data into useful insights.",
        stages: [
            {
                name: "Stage 1: Foundations",
                topics: "Excel, statistics, data handling",
                project: "Analyze student marks."
            },
            {
                name: "Stage 2: Python",
                topics: "Python, Pandas, NumPy",
                project: "Analyze a public dataset."
            },
            {
                name: "Stage 3: Data Visualization",
                topics: "SQL, Power BI or Tableau",
                project: "Create a sales dashboard."
            },
            {
                name: "Stage 4: Portfolio",
                topics: "Data storytelling and presentation",
                project: "Publish a complete data analysis case study."
            }
        ]
    },

    ai: {
        title: "AI / Machine Learning Engineer",
        description: "Develop software that learns from data.",
        stages: [
            {
                name: "Stage 1: Programming",
                topics: "Python, functions, data structures",
                project: "Create a Python data analysis program."
            },
            {
                name: "Stage 2: Mathematics and Data",
                topics: "Statistics, probability, NumPy, Pandas",
                project: "Explore and visualize a dataset."
            },
            {
                name: "Stage 3: Machine Learning",
                topics: "Regression, classification, model evaluation",
                project: "Build a basic prediction model."
            },
            {
                name: "Stage 4: Applied AI",
                topics: "Model deployment and responsible AI",
                project: "Build a small AI-powered application."
            }
        ]
    },

    cyber: {
        title: "Cybersecurity Analyst",
        description: "Help protect systems, networks, and information.",
        stages: [
            {
                name: "Stage 1: IT Fundamentals",
                topics: "Networking, operating systems, Linux",
                project: "Document a basic network setup."
            },
            {
                name: "Stage 2: Security Fundamentals",
                topics: "Threats, vulnerabilities, access control",
                project: "Create a personal security checklist."
            },
            {
                name: "Stage 3: Defensive Security",
                topics: "Logs, monitoring, incident response",
                project: "Analyze sample security logs."
            },
            {
                name: "Stage 4: Practical Learning",
                topics: "Ethical labs and security reporting",
                project: "Complete an authorized beginner security lab."
            }
        ]
    },

    cloud: {
        title: "Cloud Engineer",
        description: "Build and manage cloud-based systems.",
        stages: [
            {
                name: "Stage 1: Foundations",
                topics: "Networking, Linux, command line",
                project: "Set up a local development environment."
            },
            {
                name: "Stage 2: Cloud Basics",
                topics: "Cloud computing, storage, virtual machines",
                project: "Deploy a basic website on a cloud platform."
            },
            {
                name: "Stage 3: Automation",
                topics: "Git, scripting, containers",
                project: "Containerize a simple application."
            },
            {
                name: "Stage 4: Deployment",
                topics: "Monitoring, security, cloud architecture",
                project: "Deploy and document a sample application."
            }
        ]
    }
};

const form = document.getElementById("careerForm");
const result = document.getElementById("result");
const roadmapContent = document.getElementById("roadmapContent");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const interest = document.getElementById("interest").value;
    const level = document.getElementById("level").value;
    const hours = Number(document.getElementById("hours").value);

    if (!name || !careerPaths[interest] ||
        !level || !Number.isFinite(hours) ||
        hours < 1 || hours > 80) {
        alert("Please enter valid profile details.");
        return;
    }

    const career = careerPaths[interest];

    const stageDetails = career.stages.map((stage, index) => {
        const topics = stage.topics.split(", ");

        const checklist = topics.map(topic =>
            `<li>${topic}</li>`
        ).join("");

        return `
            <div class="roadmap-stage">
                <h3>${stage.name}</h3>
                <p><strong>Learn:</strong></p>
                <ul>${checklist}</ul>
                <p><strong>Practice project:</strong>
                ${stage.project}</p>
                <label>
                    <input type="checkbox" class="stage-check"
                        data-stage="${index}"
                        style="width:auto">
                    Mark this stage complete
                </label>
            </div>
        `;
    }).join("");

    const levelMessage = {
        beginner: "Start with the fundamentals and build gradually.",
        intermediate: "Review gaps in your fundamentals and build practical projects.",
        advanced: "Focus on advanced projects, deployment, and specialization."
    };

    roadmapContent.innerHTML = `
        <h3>Welcome, ${escapeHTML(name)}!</h3>
        <h3>${career.title}</h3>
        <p>${career.description}</p>
        <p><strong>Your current level:</strong> ${level}</p>
        <p><strong>Study plan:</strong> ${hours} hours per week</p>
        <p>${levelMessage[level]}</p>
        <h3>Your Learning Roadmap</h3>
        ${stageDetails}
        <p id="progressText">Progress: 0% complete</p>
    `;

    const checkboxes = roadmapContent.querySelectorAll(".stage-check");
    const progressText = document.getElementById("progressText");

    function updateProgress() {
        const completed = [...checkboxes]
            .filter(checkbox => checkbox.checked).length;

        const percentage = Math.round(
            completed / checkboxes.length * 100
        );

        progressText.textContent =
            `Progress: ${percentage}% complete`;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateProgress);
    });

    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth" });
});

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}
