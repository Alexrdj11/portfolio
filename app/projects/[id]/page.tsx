"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import GradualBlur from "@/components/ui/GradualBlur"
import { add } from "date-fns"

const projectsData: Record<string, any> = {
  "expense-tracker": {
    id: "expense-tracker",
    title: "XP - Expense Tracker",
    year: "2025",
    description: "A minimalist expense tracker that lets you record, categorize, and monitor your spending effortlessly. Built to give clear insights and help you stay on top of your finances without the clutter.",
    fullDescription: "XP is a modern expense tracking application designed to simplify personal finance management. With an intuitive interface and powerful features, it helps users stay on top of their spending habits and make informed financial decisions.",
    image: "/projects/xp-expense-tracker.png",
    additionalImages: [
      "/projects/xp-screenshot-1.png",
      "/projects/xp-screenshot-2.png",
      "/projects/xp-screenshot-3.png"
    ],
    tech: ["JAVA","Spring-boot", "JWT", "MySQL","React","Render","Aiven","vercel"],
    github: "https://github.com/Alexrdj11/Expense-tracker.git",
    liveDemo: "https://expense-tracker-five-omega-76.vercel.app/register",
    features: [
      "Real-time expense tracking",
      "Category-based organization",
      "Graphical spending analytics",
      "Monthly budget management",
      "Import data functionality"
    ],
    specialFeatures: [
       "Utilizes Aiven MySQL cloud database with SSL/TLS encryption for secure data storage",
       "JWT-based Authentication: Implements industry-standard JSON Web Token authentication for secure user sessions",
       "Production-Ready Deployment: Configured for deployment on Render (backend) and Vercel (frontend) with proper environment management",
       "Certificate-based Security: Custom truststore implementation for enhanced SSL/TLS security with cloud databases"
    ],
    
    learnings: "This project provided hands-on experience with enterprise-level security practices, cloud infrastructure, and modern full-stack development patterns. The most valuable lesson was understanding that security and proper configuration are just as important as feature development."
  },
  "PGFlow": {
    title: "PG tenant payment flow automation",
    year: "2025-ongoing",
    description: "An automated system to streamline monitoring and managing tenant payments in paying guest accommodations, reducing manual effort and errors.",
    fullDescription: "PGflow is an automated system designed to simplify the payment monitoring and tracking process for paying guest accomodations",
    image: "/projects/PGFlow.png",
    tech: ["Java", "TensorFlow", "ResNet50", "Flask", "Machine Learning"],
    github: "https://github.com/Alexrdj11/PGFlow.git",
    liveDemo: "Ongoing",
    features: [
      "coming-soon"
    ],
    learnings: "coming-soon"
  },
  "FLDDoS": {
    title: "Privacy preserving DDoS detection using Federated Learning across Distributed Systems",
    year: "2024-25",
    description: "Federated Learning based DDoS detection with data poisoning resistance.",
    fullDescription: "This project focuses on Federated Learning to maintain data privacy while collaboratively training DDoS detection models across distributed systems. Further we implement data poisoning resistance with byzantine client tolerance.",
    image: "/projects/FLDDoS.png",
    additionalImages: [
      "/projects/flddos-dashboard.jpg"
    ],
    tech: ["Python", "Flower-framework", "Tensorflow", "Docker", "CICDDoS2019 Dataset"],
    github: "https://github.com/HemanthKumar-CS/Fedrated_DDoS_Detection.git",
    liveDemo: null,
    features: [
      "Uses Flower Architecture for Federated Learning",
      "Tolereant to Byzantine clients with data poisoning attacks",
      "30 features considered from a total of 88 features [CICDDoS2019 Dataset]",
      "Dockerized for easy deployment and scalability",
      "An easy to understand attack detection and monitoring dashboard "
    ],
    learnings: "Preprocessed the CICDDoS2019 dataset,sampled dataset from 23.9gb to 2.24gb[50k records],reduced features from 88 to 30+2, balanced dataset 25k as benign and 25k as attack, implemented the federated learning setup using Flower framework and compared multi-krum with hybrid data-poisoning resilent aggregation techniques.",
    paperPath: "https://doi.org/10.1109/ICAFT66710.2025.11452998"
  },
  "melanocytic-nevi-classification": {
    title: "Melanocytic nevi classification",
    year: "2023-24",
    description: "A melanocytic nevi classification system using Transfer Learning to assist in early detection of skin cancer.",
    fullDescription: "This project utilizes Transfer Learning with Resnet50 to classify melanocytic nevi, aiding in the early detection of skin cancer. The system is designed to improve diagnostic accuracy and support medical professionals.",
    image: "/projects/melanocytic-nevi.png",
    tech: ["Python", "Flask","Deep-Learning", "Transfer-Learning", "Resnet50"],
    github: "https://github.com/Alexrdj11/Melanocytic_Nevi_Classification_Using_Transfer_Learning.git",
    liveDemo: null,
    features: [
      "Automated Skin Disease Classification",
      "Transfer Learning with ResNet50",
      "Preprocessing & Data Augmentation",
      "Binary Cross-Entropy Optimization",
      "Accurate model performance"
    ],
    additionalImages: [
      "/projects/melanocytic-nevi-1.png",
    ],
    confusionMatrixImage: "/projects/melanocytic-nevi-confusion-matrix.png",
    confusionMatrixExplanation: "The confusion matrix provides an in-depth evaluation of the classification model's performance: \n True Positives (Melanocytic Nevi): 1195 samples correctly identified.\nTrue Negatives (Normal Skin): 586 samples correctly classified.\nFalse Positives: Only 1 normal skin sample misclassified as melanocytic nevi.\nFalse Negatives: 0 cases; the model consistently identified all melanocytic nevi.\n False Negatives: 0 cases; the model consistently identified all melanocytic nevi.",
    learnings: "Preprocessed  the melanocytic nevi dataset, implemented data augmentation, tuned hyperparameters for optimal model performance, tested model on unseen data and deployed using Flask.",
    paperLink: "https://www.igminresearch.com/articles/html/igmin307",
    imageCaption: "Model architecture"
  },
  "astroventure": {
    title: "Astroventure - Space Quiz Game",
    year: "2023-24",
    description: "Just a fun project i created in my free time its a space-themed interactive quiz game that tests your knowledge about the universe, understand the reason behind the answers and share your achivements with your friends",
    fullDescription: "Astroventure is an engaging space-themed quiz game designed to educate and entertain users by testing their knowledge about the universe. The game provides detailed explanations for each answer, helping players learn as they play. It also features a progress tracking system, achievement rewards, and social sharing capabilities to enhance user engagement and community interaction.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/06/solar-system-illustration-1920x640-2.jpg",
    tech: ["Python", "flask"],
    github: "https://github.com/Alexrdj11/Astroverse-py1game.git",
    liveDemo: "https://astroverse-py1game-7xyu.vercel.app/",
    features: [
      "Interactive quiz interface",
      "Detailed answer explanations",
      "Progress tracking",
      "Achievement system",
      "Social sharing capabilities"
    ],
    learnings: "vibe coded the entire thing so had fun with prompt engineering and testing out various ideas around quizzing and gamification"
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const project = projectsData[projectId]

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-cyan-400 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 relative">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-gray-500 text-sm mb-4">{project.year}</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            {project.description}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video mb-16 overflow-hidden bg-zinc-900"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Project Details Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm text-gray-500 mb-4 uppercase tracking-wider">Technology</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-white/10 text-white border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm text-gray-500 mb-4 uppercase tracking-wider">Links</h3>
            <div className="space-y-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
              >
                <Github size={18} />
                View Source Code
              </a>
              {project.liveDemo && (
                <>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  {project.id === "expense-tracker" && (
                    <p className="text-xs text-gray-500 mt-1">
                      * Site may be down as it runs on free-tier servers
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* Year */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-sm text-gray-500 mb-4 uppercase tracking-wider">Year</h3>
            <p className="text-white text-2xl font-bold">{project.year}</p>
          </motion.div>
        </div>

        {/* Full Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">About the Project</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {project.fullDescription}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature: string, index: number) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-400"
              >
                <span className="text-cyan-400 mt-1">→</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Additional Screenshots - First Two */}
        {project.additionalImages && project.additionalImages.length >= 2 && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="relative h-[400px] overflow-hidden bg-zinc-900 border border-white/10 rounded-lg"
            >
              <img
                src={project.additionalImages[0]}
                alt={`${project.title} screenshot 1`}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative h-[400px] overflow-hidden bg-zinc-900 border border-white/10 rounded-lg"
            >
              <img
                src={project.additionalImages[1]}
                alt={`${project.title} screenshot 2`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        )}

        {/* Single Additional Screenshot with Caption */}
        {project.additionalImages && project.additionalImages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mb-16"
          >
            <div className="relative h-[500px] overflow-hidden bg-zinc-900 border border-white/10 rounded-lg">
              <img
                src={project.additionalImages[0]}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-center text-gray-400 mt-4 text-sm italic">
              {project.imageCaption || "FLDDoS monitoring dashboard"}
            </p>
          </motion.div>
        )}

        {/* What's Special */}
        {project.specialFeatures && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">What's Special</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {project.specialFeatures.map((feature: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-400"
                >
                  <span className="text-cyan-400 mt-1">★</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Additional Screenshot - Third Image */}
        {project.additionalImages && project.additionalImages.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="relative h-[500px] mb-16 overflow-hidden bg-zinc-900 border border-white/10 rounded-lg"
          >
            <img
              src={project.additionalImages[2]}
              alt={`${project.title} screenshot 3`}
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}

        {/* Future Improvements */}
        {project.futureImprovements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Future Improvements</h2>
            <ul className="space-y-3">
              {project.futureImprovements.map((improvement: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-400"
                >
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* What I Learned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">What I Learned</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {project.learnings}
          </p>
        </motion.div>

        {/* Confusion Matrix Section */}
        {project.confusionMatrixImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Model Performance</h2>
            <div className="relative h-[500px] overflow-hidden bg-zinc-900 border border-white/10 rounded-lg mb-6">
              <img
                src={project.confusionMatrixImage}
                alt="Confusion Matrix"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              {project.confusionMatrixExplanation}
            </p>
          </motion.div>
        )}

        {/* Paper Section - Published */}
        {project.paperLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Published Paper</h2>
            <a
              href={project.paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative group cursor-pointer"
            >
              <div className="relative h-[600px] overflow-hidden bg-zinc-900 border-2 border-white/20 rounded-lg hover:border-cyan-400 transition-all duration-300">
                <iframe
                  src={project.paperLink}
                  className="w-full h-full pointer-events-none"
                  title="Published Research Paper Preview"
                />
                
                {/* View Paper Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <p className="text-white text-xl font-semibold">Click to View Paper</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-400 mt-4 text-sm italic">
                Published paper available online
              </p>
            </a>
          </motion.div>
        )}

        {/* Paper Section - Working Paper */}
        {project.paperPath && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Paper</h2>
            <a
              href={project.paperPath}
              download
              className="block relative group cursor-pointer"
            >
              <div className="relative h-[600px] overflow-hidden bg-zinc-900 border-2 border-white/20 rounded-lg hover:border-cyan-400 transition-all duration-300">
                <iframe
                  src={`${project.paperPath}#toolbar=0`}
                  className="w-full h-full pointer-events-none"
                  title="Research Paper Preview"
                />
                
                {/* Download Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-white text-xl font-semibold">Click to Download Paper</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-400 mt-4 text-sm italic">
                *Working paper, not yet published
              </p>
            </a>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center py-12 border-t border-white/10"
        >
          <Link
            href="/#projects"
            className="group relative inline-block px-8 py-4"
          >
            {/* Corner highlights */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>
            
            <span className="text-white font-semibold relative block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                View More Projects
              </span>
              <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                View More Projects
              </span>
            </span>
          </Link>
        </motion.div>
      </div>

      <GradualBlur
        target="page"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={8}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
    </div>
  )
}
