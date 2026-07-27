"use client"

import { useRef, useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { DecryptedText } from './ui/decrypted-text'
import Link from 'next/link'
import { usePageTransition } from './transition-provider'

const projects = [
	{
		id: "expense-tracker",
		title: "XP- start tracking your expenses with ease ",
		description: "Finding it hard to track your expenses? Use XP to effortlessly monitor and manage your spending habits.",
		tech: ["JAVA", "Spring-Boot", "JDBC", "React","Aiven","Render"],
		image: "/projects/xp-expense-tracker.png",
		github: "https://github.com/Alexrdj11/Expense-tracker.git",
		link: "https://expense-tracker-five-omega-76.vercel.app/register",
		year: "2025",
		color: "from-purple-600/30 to-pink-600/30"
	},
	{
		id: "PGFlow",
		title: "PG tenant payment flow automation",
		description: "An automated system to streamline monitoring and managing tenant payments in paying guest accommodations, reducing manual effort and errors.",
		tech: ["JAVA", "Spring-boot", "Firebase", "n8n"],
		image: "/projects/PGFlow.png",
		github: "https://github.com/Alexrdj11/PGFlow.git",
		link: "https://github.com/Alexrdj11/PGFlow.git",
		year: "2025",
		color: "from-blue-600/30 to-cyan-600/30"
	},
	{
		id: "FLDDoS",
		title: "Privacy preserving DDoS detection using Federated Learning across Distributed Systems",
		description: "Federated Learning based DDoS detection with data poisoning resistance.",
		tech: ["Python", "Flower-framework", "Tensorflow", "Docker", "CICDDoS2019 Dataset"],
		image: "/projects/FLDDoS.png",
		github: "https://github.com/HemanthKumar-CS/Fedrated_DDoS_Detection.git",
		link: "https://github.com/HemanthKumar-CS/Fedrated_DDoS_Detection.git",
		year: "2024-25",
		color: "from-pink-600/30 to-purple-600/30"
	},
	{
		id: "melanocytic-nevi-classification",
		title: "Melanocytic Nevi Classification Using Transfer Learning",
		description: "A melanocytic nevi classification system using Transfer Learning to assist in early detection of skin cancer.",
		tech: ["Python", "Flask","Deep-Learning", "Transfer-Learning", "Resnet50"],
		image: "/projects/melanocytic-nevi.png",
		github: "https://github.com/Alexrdj11/Melanocytic_Nevi_Classification_Using_Transfer_Learning.git",
		link: "https://github.com/Alexrdj11/Melanocytic_Nevi_Classification_Using_Transfer_Learning.git",
		year: "2023-24",
		color: "from-green-600/30 to-teal-600/30"
	},
	{
		id: "astroventure",
		title: "Astroventure - Space Quiz Game",
		description: "A fun space-themed interactive quiz game i vibe coded in my free time, have fun!!",
		tech: ["Python", "flask"],
		image: "https://science.nasa.gov/wp-content/uploads/2023/06/solar-system-illustration-1920x640-2.jpg",
		github: "https://github.com/Alexrdj11/Astroverse-py1game.git",
		link: "https://astroverse-py1game-7xyu.vercel.app/",
		year: "2023-24",
		color: "from-blue-600/30 to-purple-600/30"
	}
]

export function ProjectsSection() {
	return (
		<section id="projects" className="py-32 px-4 md:px-8 relative">
			<div className="max-w-7xl mx-auto">
			<DecryptedText
				as="h2"
				text="My works"
				className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-24 text-white"
				speed={40}
				triggerOnView={true}
				triggerOnHover={true}
			/>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{projects.map((project, index) => (
						<ProjectCard key={index} project={project} index={index} />
					))}
				</div>

				<div className="flex justify-center mt-32">
					<a
						href="https://github.com/Alexrdj11"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative"
					>
						{/* Corner highlights */}
						<div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						
						<div className="px-8 py-4 border border-white/20 relative overflow-hidden transition-all duration-300 group-hover:bg-white/10">
							<span className="relative z-10 text-white font-semibold transition-colors duration-300 group-hover:text-cyan-400">
								View All Projects on GitHub
							</span>
						</div>
					</a>
				</div>
			</div>
		</section>
	)
}

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
	const cardRef = useRef<HTMLDivElement>(null)
	const badgeRef = useRef<HTMLDivElement>(null)
	const spotlightRef = useRef<HTMLDivElement>(null)
	const [isHovered, setIsHovered] = useState(false)
	const { navigate } = usePageTransition()

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		if (badgeRef.current) {
			badgeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
		}
		if (spotlightRef.current) {
			spotlightRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 70%)`
		}
	}

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		navigate(`/projects/${project.id}`)
	}

	return (
		<div onClick={handleClick}>
			<div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className="group relative bg-zinc-900/50 border border-white/10 overflow-hidden cursor-pointer h-full flex flex-col"
			>
				{/* Transparent Square "Click on me" Follow Badge */}
				<div
					ref={badgeRef}
					className={`pointer-events-none absolute left-0 top-0 z-30 flex items-center gap-2 px-3.5 py-2 bg-black/40 backdrop-blur-md border border-cyan-400/40 text-cyan-300 font-mono text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-opacity duration-200 ease-out ${
						isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
					}`}
					style={{
						willChange: "transform",
						transform: "translate3d(-100px, -100px, 0)",
					}}
				>
					{/* Corner highlights on badge */}
					<div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400"></div>
					<div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyan-400"></div>
					<div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyan-400"></div>
					<div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400"></div>

					<span>Click on me</span>
					<ExternalLink className="w-3.5 h-3.5 stroke-[2]" />
				</div>

				{/* Spotlight effect */}
				<div
					ref={spotlightRef}
					className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				/>

				{/* Corner highlights */}
				<div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
				<div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
				<div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
				<div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

				{/* Image */}
				<div className="relative h-48 overflow-hidden">
					<img
						src={project.image}
						alt={project.title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
				</div>

				{/* Content */}
				<div className="p-6 flex-1 flex flex-col relative z-10">
					<div className="flex items-start justify-between mb-3">
						<h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
							<DecryptedText
								text={project.title}
								speed={20}
								triggerOnView={false}
								triggerOnHover={true}
								as="span"
							/>
						</h3>
					</div>

					<p className="text-gray-400 text-sm mb-4 flex-1">
						{project.description}
					</p>

					{/* Tech stack */}
					<div className="flex flex-wrap gap-2 mb-4">
						{project.tech.map((tech, i) => (
							<span
								key={i}
								className="px-2 py-1 text-xs bg-white/5 text-gray-300 border border-white/10"
							>
								{tech}
							</span>
						))}
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between text-sm">
						<span className="text-gray-500">{project.year}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
