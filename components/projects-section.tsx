"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Github, ExternalLink } from "lucide-react"

const projects = [
	{
		title: "FINT - Food Image Nutritional Tracker",
		description:
			"FINT- is a web application that allows users to upload food images and get nutritional information using a pre-trained VGG-16 model.",
		tech: ["Python", "TensorFlow", "streamlit","machine-learning- vgg-16"],
		image: "https://cdn-ljoih.nitrocdn.com/oBFKmyoZXFdGDWuOfBnqVxXuxCObplGb/assets/images/optimized/rev-11d4bee/i0.wp.com/sanshreefoods.com/wp-content/uploads/2025/04/0ee7b2401e17e0186f23d34b0e5fbf86.benefits-of-tracking-calories-2.jpg",
		github: "https://github.com/Alexrdj11/FINT",
	},
	{
		title: "Melanocytic Nevi Classification",
		description:
			"A web application that classifies melanocytic nevi using a pre-trained ResNet50 model.",
		tech: ["Python", "machine-learning", "transfer-learning","resnet-50", "flask"],
		image: "https://towardsdatascience.com/wp-content/uploads/2022/08/0tH9evuOFqk8F41FG.png",
		github: "https://github.com/Alexrdj11/melanocytic_nevi_diagnosis",
	},
	{
		title: "Move Mentor",
		description:
			"A real time school/college bus ETA along with live tracking and student attendence and driver dashboard",
		tech: ["Flask", "google-maps-API", "typescript", "js"],
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScx9U8gEuDO1NNilGxno3FYZKOjK9zG3Sj2Q&s",
		github: "https://github.com/The-Ciphnex/Move_Mentor-draft.git",
	},
	{
		title: "Astroventure- A space based interactive quiz game",
		description:
			"A space-themed interactive quiz game that tests your knowledge about the universe, understand the reason behind the answers and share your achivements with your friends",
		tech: ["Python", "flask"],
		image: "https://science.nasa.gov/wp-content/uploads/2023/06/solar-system-illustration-1920x640-2.jpg",
		github: "https://github.com/harsha/data-analytics-dashboard",
		liveDemo: "https://astroverse-py1game-3.onrender.com/",
	},
]

export function ProjectsSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: "-100px" })

	return (
		<section ref={ref} id="projects-section" className="py-20 px-4">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-orbitron font-bold text-color white">
						A small section of my projects.
					</h2>
					
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{projects.map((project, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							whileHover={{ scale: 1.05, rotateY: 5 }}
							className="glass rounded-xl overflow-hidden glass-hover group"
						>
							<div className="relative overflow-hidden">
								<img
									src={project.image || "/placeholder.svg"}
									alt={project.title}
									className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
							</div>

							<div className="p-6">
								<h3 className="text-xl font-semibold mb-3 text-gradient">
									{project.title}
								</h3>
								<p className="text-gray-300 mb-4 text-justify">
									{project.description}
								</p>

								<div className="flex flex-wrap gap-2 mb-4">
									{project.tech.map((tech, techIndex) => (
										<span
											key={techIndex}
											className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
										>
											{tech}
										</span>
									))}
								</div>

								<div className="flex justify-center gap-3">
									<motion.a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="flex items-center gap-2 px-4 py-2 glass glass-hover rounded-lg font-semibold text-sm"
									>
										<Github size={16} />
										View 
									</motion.a>

									{project.liveDemo && (
										<motion.a
											href={project.liveDemo}
											target="_blank"
											rel="noopener noreferrer"
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-sm glow"
										>
											<ExternalLink size={16} />
											Play It Here
										</motion.a>
									)}
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Checkout more button */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="text-center mt-12"
				>
					<motion.a
						href="https://github.com/Alexrdj11"
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)" }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-lg glow transition-all duration-300 cursor-pointer"
					>
						<Github size={20} />
						Checkout more
					</motion.a>
				</motion.div>
			</div>
		</section>
	)
}
