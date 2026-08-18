"use client"

import { useState } from 'react'
import { Github, ExternalLink, ChevronRight } from 'lucide-react'
import { DecryptedText } from './ui/decrypted-text'
import { usePageTransition } from './transition-provider'
import MorphSlider, { MorphItem } from './ui/MorphSlider'

const projects = [
	{
		id: "My Metahuman",
		title: "Creating my own metahuman",
		description: "A complete custom metahuman made from my face scan using unreal engine 5",
		tech: ["Unreal Engine 5", "Blender", "metahuman creator", "tripio.ai",],
		image: "/projects/main_harsha.png",
		github: "https://github.com/Alexrdj11/portfolio",
		link: "https://portfolio-topaz-gamma-tbzzc6ivbd.vercel.app/",
		year: "2026",
		color: "from-cyan-500/30 to-blue-600/30"
	},
	{
		id: "Machine Cost Estimator",
		title: "Machine Cost Estimator",
		description: "Simple machine part cost estimation using gemini and numpy",
		tech: ["Python", "Gemini AI", "NumPy", "Flask", "Tailwind CSS"],
		image: "/projects/machine-part.jpg",
		github: "https://github.com/Alexrdj11/machine-parts-cost-analyzer.git",
		link: "https://github.com/Alexrdj11/machine-parts-cost-analyzer.git",
		year: "2026",
		color: "from-purple-600/30 to-emerald-500/30"
	},
	{
		id: "expense-tracker",
		title: "XP- start tracking your expenses with ease ",
		description: "Finding it hard to track your expenses? Use XP to effortlessly monitor and manage your spending habits.",
		tech: ["JAVA", "Spring-Boot", "JDBC", "React", "Aiven", "Render"],
		image: "/projects/xp-expense-tracker.png",
		github: "https://github.com/Alexrdj11/Expense-tracker.git",
		link: "https://expense-tracker-seven-opal.vercel.app/",
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
		year: "2026-ongoing",
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
		tech: ["Python", "Flask", "Deep-Learning", "Transfer-Learning", "Resnet50"],
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

const morphItems: MorphItem[] = projects.map((p) => ({
	image: p.image,
	caption: `${p.year} • ${p.title}`
}))

export function ProjectsSection() {
	const [activeIndex, setActiveIndex] = useState(0)
	const { navigate } = usePageTransition()

	const currentProject = projects[activeIndex] || projects[0]

	const handleCardClick = () => {
		navigate(`/projects/${currentProject.id}`)
	}

	return (
		<section id="projects" className="py-24 px-4 md:px-8 relative bg-black text-white overflow-hidden">
			<div className="max-w-6xl mx-auto">
				{/* Section Title */}
				<div className="flex flex-col items-center text-center mb-12">
					<DecryptedText
						as="h2"
						text="My works"
						className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
						speed={40}
						triggerOnView={true}
						triggerOnHover={true}
					/>
					<p className="text-gray-400 text-sm md:text-base max-w-2xl">
						Checkout my work
					</p>
				</div>

				{/* Main Content Layout: Morph Slider + Active Project Card Details */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

					{/* Left / Top: MorphSlider Component (7 Cols) */}
					<div className="lg:col-span-7 flex flex-col">
						<div className="relative w-full h-[380px] md:h-[480px] rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-zinc-950">
							<MorphSlider
								items={morphItems}
								startIndex={0}
								transition="melt"
								duration={1.2}
								intensity={0.55}
								aberration={0.35}
								drift={0.4}
								autoplay={false}
								radius={16}
								showCaptions={true}
								showControls={true}
								showIndicators={true}
								onIndexChange={setActiveIndex}
							/>
						</div>
					</div>

					{/* Right / Bottom: Active Project Interactive Metadata Panel (5 Cols) */}
					<div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl relative overflow-hidden">

						{/* Background Glow */}
						<div className="absolute -right-20 -top-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

						<div>
							{/* Top meta bar */}
							<div className="flex items-center justify-between gap-4 mb-4">
								<span className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono rounded-full uppercase tracking-wider">
									Project 0{activeIndex + 1} / 0{projects.length}
								</span>
								<span className="text-gray-400 text-xs font-mono">
									{currentProject.year}
								</span>
							</div>

							{/* Title */}
							<h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
								<DecryptedText
									key={`${currentProject.id}-${activeIndex}`}
									text={currentProject.title}
									speed={20}
									triggerOnView={false}
									triggerOnHover={true}
									as="span"
								/>
							</h3>

							{/* Description */}
							<p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
								{currentProject.description}
							</p>

							{/* Tech Stack Pills */}
							<div className="mb-6">
								<h4 className="text-xs uppercase font-mono text-gray-400 mb-2.5 tracking-wider">Technologies</h4>
								<div className="flex flex-wrap gap-2">
									{currentProject.tech.map((t, idx) => (
										<span
											key={idx}
											className="px-2.5 py-1 text-xs font-mono bg-white/5 text-cyan-200 border border-white/10 rounded-md"
										>
											{t}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
							<button
								onClick={handleCardClick}
								className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer"
							>
								<span>View Case Study</span>
								<ChevronRight className="w-4 h-4" />
							</button>

							<div className="flex items-center gap-3">
								{currentProject.github && (
									<a
										href={currentProject.github}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
										title="View Source Code on GitHub"
									>
										<Github className="w-5 h-5" />
									</a>
								)}
								{currentProject.link && (
									<a
										href={currentProject.link}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-cyan-400 transition-colors"
										title="Open Live Preview"
									>
										<ExternalLink className="w-5 h-5" />
									</a>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Footer Link */}
				<div className="flex justify-center mt-16">
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

