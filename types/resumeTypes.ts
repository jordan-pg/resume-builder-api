export interface Resume {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedIn: string;
    website: string;
    summary: string;
    experiences: Experience[];
    education: Education[];
    skills: string[];
}

export interface Experience {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string[];
}

export interface Education {
    school: string;
    degree: string;
    graduationYear: string;
}

export const mockResume: Resume = {
    name: 'Alex Johnson',
    title: 'Senior Software Engineer',
    email: 'alex.johnson@example.com',
    phone: '123-456-7890',
    linkedIn: 'linkedin.com/in/alexjohnson',
    website: 'github.com/alexjohnson',
    summary: 'Experienced software engineer with a strong background in developing scalable web applications. Proficient in a range of modern technologies including React, Node.js, and cloud services.',
    experiences: [
        {
            title: 'Senior Software Engineer',
            company: 'Tech Solutions Inc.',
            startDate: 'March 2019',
            endDate: 'Present',
            description: [
                'Led the development of a new feature-rich e-commerce platform, resulting in a 20% increase in sales.',
                'Mentored junior developers and conducted code reviews to maintain code quality and integrate best practices.',
            ],
        },
        {
            title: 'Software Developer',
            company: 'Innovative Startups Ltd.',
            startDate: 'June 2015',
            endDate: 'February 2019',
            description: [
                'Collaborated in a team to develop a mobile application that reached 100,000+ downloads in the first six months.',
                'Implemented RESTful APIs and worked closely with front-end developers to integrate backend services.',
            ],
        },
    ],
    education: [
        {
            school: 'State University',
            degree: 'Bachelor of Science in Computer Science',
            graduationYear: '2015',
        },
        {
            school: 'State University',
            degree: 'Bachelor of Science in Computer Science',
            graduationYear: '2015',
        },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Docker', 'SQL'],
};
