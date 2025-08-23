import { PageLayout } from "@/components/page-layout"
import { SectionContainer } from "@/components/section-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock news data - in a real app, this would come from a database or API
const newsArticles = {
  1: {
    id: 1,
    title: "Revolutionary Alzheimer's Treatment Shows Promise in Clinical Trials",
    category: "Research",
    author: "Dr. Sarah Mitchell",
    publishedDate: "2024-01-15",
    readTime: "8 min read",
    image: "/news-alzheimers-research.png",
    excerpt: "New breakthrough drug demonstrates significant cognitive improvement in early-stage patients",
    content: `
      <p>A groundbreaking clinical trial has shown remarkable results for a new Alzheimer's treatment that could revolutionize how we approach this devastating disease. The Phase III trial, conducted across 15 medical centers worldwide, demonstrated significant cognitive improvements in patients with early-stage Alzheimer's disease.</p>
      
      <h2>Key Findings</h2>
      <p>The study, involving 2,400 participants over 18 months, showed that patients receiving the new treatment experienced:</p>
      <ul>
        <li>27% slower cognitive decline compared to placebo group</li>
        <li>Improved daily functioning scores</li>
        <li>Better quality of life measurements</li>
        <li>Reduced brain amyloid plaques by up to 35%</li>
      </ul>
      
      <h2>How It Works</h2>
      <p>The treatment works by targeting the underlying pathology of Alzheimer's disease, specifically the accumulation of amyloid-beta plaques in the brain. Unlike previous treatments that only managed symptoms, this new approach addresses the root cause of the disease.</p>
      
      <p>Dr. Jennifer Walsh, lead researcher at the National Institute of Neurological Disorders, explains: "This represents a paradigm shift in Alzheimer's treatment. We're not just slowing symptoms anymore – we're actually modifying the disease process itself."</p>
      
      <h2>Next Steps</h2>
      <p>The FDA is expected to review the treatment for approval within the next 6 months. If approved, it could become available to patients by late 2024. The treatment will initially be recommended for patients in the early stages of Alzheimer's disease.</p>
      
      <p>Healthcare providers are already preparing for the potential rollout, with specialized clinics being established to administer the treatment, which requires monthly infusions.</p>
      
      <h2>Patient Impact</h2>
      <p>For families affected by Alzheimer's, this news brings hope after decades of limited treatment options. The Alzheimer's Association estimates that over 6 million Americans currently live with the disease, with numbers expected to rise as the population ages.</p>
      
      <p>"This could be the breakthrough we've been waiting for," says Maria Rodriguez, whose husband participated in the trial. "We've seen real improvements in his memory and daily activities. It's given us hope for the future."</p>
    `,
    tags: ["Alzheimer's", "Clinical Trial", "Breakthrough", "Neurology"],
    relatedArticles: [2, 3],
  },
  2: {
    id: 2,
    title: "Minimally Invasive Heart Surgery Techniques Reduce Recovery Time by 50%",
    category: "Surgery",
    author: "Dr. Michael Chen",
    publishedDate: "2024-01-12",
    readTime: "6 min read",
    image: "/news-heart-surgery.png",
    excerpt: "Advanced robotic surgery techniques are transforming cardiac care with faster recovery times",
    content: `
      <p>Cardiac surgeons are increasingly turning to minimally invasive techniques that are dramatically reducing patient recovery times and improving outcomes. New robotic-assisted procedures are allowing surgeons to perform complex heart operations through small incisions, leading to faster healing and reduced complications.</p>
      
      <h2>Revolutionary Techniques</h2>
      <p>The latest minimally invasive cardiac procedures include:</p>
      <ul>
        <li>Robotic mitral valve repair through 2-inch incisions</li>
        <li>Transcatheter aortic valve replacement (TAVR)</li>
        <li>Minimally invasive coronary artery bypass</li>
        <li>Robotic atrial septal defect closure</li>
      </ul>
      
      <h2>Patient Benefits</h2>
      <p>Patients undergoing these advanced procedures experience significant advantages:</p>
      <ul>
        <li>50% reduction in hospital stay (average 3-4 days vs 7-10 days)</li>
        <li>Less post-operative pain and scarring</li>
        <li>Faster return to normal activities</li>
        <li>Lower risk of infection and complications</li>
        <li>Improved cosmetic outcomes</li>
      </ul>
      
      <h2>Technology Behind the Success</h2>
      <p>The success of these procedures relies on advanced robotic systems that provide surgeons with enhanced precision and control. The da Vinci surgical system, along with newer platforms, offers 3D visualization and instruments that can move with greater dexterity than human hands.</p>
      
      <p>Dr. Lisa Park, Chief of Cardiac Surgery at Metropolitan Heart Institute, notes: "These technologies allow us to perform the same complex procedures with unprecedented precision while minimizing trauma to the patient's body."</p>
      
      <h2>Expanding Access</h2>
      <p>Major medical centers across the country are investing in these technologies, making minimally invasive cardiac surgery more widely available. Training programs for surgeons are also expanding to meet growing demand.</p>
      
      <p>Insurance coverage for these procedures has improved significantly, with most major insurers now covering robotic cardiac surgery when medically appropriate.</p>
    `,
    tags: ["Heart Surgery", "Robotic Surgery", "Minimally Invasive", "Cardiology"],
    relatedArticles: [1, 4],
  },
  3: {
    id: 3,
    title: "AI-Powered Cancer Detection Achieves 95% Accuracy in Early Screening",
    category: "Technology",
    author: "Dr. Amanda Foster",
    publishedDate: "2024-01-10",
    readTime: "7 min read",
    image: "/news-ai-cancer-detection.png",
    excerpt: "Machine learning algorithms are revolutionizing cancer screening with unprecedented accuracy rates",
    content: `
      <p>Artificial intelligence is transforming cancer detection with new algorithms achieving 95% accuracy in identifying early-stage cancers across multiple types. This breakthrough technology is being implemented in screening programs worldwide, potentially saving millions of lives through earlier detection.</p>
      
      <h2>How AI Detection Works</h2>
      <p>The AI system analyzes medical images using deep learning algorithms trained on millions of scans. The technology can detect subtle patterns invisible to the human eye, identifying cancerous changes at the cellular level.</p>
      
      <p>Key capabilities include:</p>
      <ul>
        <li>Mammography analysis for breast cancer detection</li>
        <li>CT scan evaluation for lung cancer screening</li>
        <li>Dermatological image analysis for skin cancer</li>
        <li>Colonoscopy video analysis for colorectal cancer</li>
      </ul>
      
      <h2>Clinical Trial Results</h2>
      <p>A comprehensive study involving 50,000 patients across 25 medical centers showed remarkable results:</p>
      <ul>
        <li>95% accuracy in cancer detection</li>
        <li>40% reduction in false positives</li>
        <li>30% increase in early-stage cancer identification</li>
        <li>25% reduction in unnecessary biopsies</li>
      </ul>
      
      <h2>Real-World Implementation</h2>
      <p>Several major healthcare systems have already integrated AI screening into their routine practice. The technology works alongside radiologists and pathologists, enhancing their diagnostic capabilities rather than replacing them.</p>
      
      <p>Dr. Robert Kim, Director of Oncology Imaging at City Medical Center, explains: "AI doesn't replace our expertise – it amplifies it. We can now catch cancers we might have missed and provide patients with earlier, more effective treatment options."</p>
      
      <h2>Future Developments</h2>
      <p>Researchers are working on expanding AI detection to additional cancer types and improving accuracy even further. Next-generation systems are being developed that can predict cancer risk years before symptoms appear.</p>
      
      <p>The technology is also being adapted for use in resource-limited settings, potentially bringing advanced cancer screening to underserved populations worldwide.</p>
    `,
    tags: ["AI", "Cancer Detection", "Machine Learning", "Screening"],
    relatedArticles: [1, 5],
  },
  4: {
    id: 4,
    title: "New Diabetes Management Guidelines Emphasize Personalized Treatment",
    category: "Guidelines",
    author: "Dr. Patricia Williams",
    publishedDate: "2024-01-08",
    readTime: "5 min read",
    image: "/news-diabetes-guidelines.png",
    excerpt: "Updated clinical guidelines focus on individualized care plans for better diabetes outcomes",
    content: `
      <p>The American Diabetes Association has released updated guidelines that emphasize personalized treatment approaches for diabetes management. The new recommendations move away from one-size-fits-all protocols toward individualized care plans based on patient-specific factors.</p>
      
      <h2>Key Changes in Guidelines</h2>
      <p>The updated guidelines introduce several important changes:</p>
      <ul>
        <li>Personalized HbA1c targets based on individual risk factors</li>
        <li>Expanded use of continuous glucose monitoring</li>
        <li>Integration of newer diabetes medications</li>
        <li>Emphasis on lifestyle interventions alongside medication</li>
      </ul>
      
      <h2>Personalized Care Approach</h2>
      <p>The new guidelines recognize that diabetes affects each patient differently. Treatment plans now consider:</p>
      <ul>
        <li>Age and life expectancy</li>
        <li>Presence of cardiovascular disease</li>
        <li>Risk of hypoglycemia</li>
        <li>Patient preferences and lifestyle</li>
        <li>Access to healthcare resources</li>
      </ul>
      
      <h2>Technology Integration</h2>
      <p>The guidelines strongly recommend the use of technology in diabetes management, including continuous glucose monitors, insulin pumps, and smartphone apps for tracking blood sugar levels and medication adherence.</p>
      
      <p>Dr. Sarah Johnson, endocrinologist at Diabetes Care Center, notes: "These tools give us real-time data that helps us make more informed treatment decisions and helps patients better understand their condition."</p>
      
      <h2>Impact on Patient Care</h2>
      <p>Healthcare providers are already implementing these new guidelines, with many reporting improved patient outcomes and satisfaction. The personalized approach has led to better blood sugar control and reduced complications.</p>
      
      <p>Patients are responding positively to the more individualized care, with many reporting feeling more engaged in their treatment decisions and better equipped to manage their condition.</p>
    `,
    tags: ["Diabetes", "Guidelines", "Personalized Medicine", "Endocrinology"],
    relatedArticles: [2, 5],
  },
  5: {
    id: 5,
    title: "Mental Health Apps Show Promising Results in Clinical Studies",
    category: "Mental Health",
    author: "Dr. James Rodriguez",
    publishedDate: "2024-01-05",
    readTime: "6 min read",
    image: "/news-mental-health-apps.png",
    excerpt: "Digital therapeutics for mental health demonstrate effectiveness in treating anxiety and depression",
    content: `
      <p>Clinical studies are showing that mental health apps can be effective tools for treating anxiety and depression, with some digital therapeutics performing as well as traditional therapy in certain populations. This research is paving the way for broader integration of digital mental health tools into clinical practice.</p>
      
      <h2>Study Results</h2>
      <p>A comprehensive analysis of 15 clinical trials involving over 10,000 participants found that mental health apps produced significant improvements in:</p>
      <ul>
        <li>Anxiety symptoms (35% reduction on average)</li>
        <li>Depression scores (40% improvement)</li>
        <li>Sleep quality and duration</li>
        <li>Overall quality of life measures</li>
      </ul>
      
      <h2>Types of Digital Interventions</h2>
      <p>The most effective apps incorporated evidence-based therapeutic approaches:</p>
      <ul>
        <li>Cognitive Behavioral Therapy (CBT) modules</li>
        <li>Mindfulness and meditation exercises</li>
        <li>Mood tracking and journaling features</li>
        <li>Peer support communities</li>
        <li>Crisis intervention resources</li>
      </ul>
      
      <h2>Accessibility Benefits</h2>
      <p>Mental health apps offer several advantages over traditional therapy:</p>
      <ul>
        <li>24/7 availability and immediate access</li>
        <li>Lower cost compared to in-person therapy</li>
        <li>Reduced stigma and increased privacy</li>
        <li>Ability to reach underserved populations</li>
        <li>Integration with other health tracking tools</li>
      </ul>
      
      <h2>Clinical Integration</h2>
      <p>Healthcare providers are beginning to prescribe mental health apps as part of comprehensive treatment plans. Some insurance companies are also starting to cover digital therapeutics for mental health conditions.</p>
      
      <p>Dr. Maria Santos, a psychiatrist at Community Mental Health Center, explains: "These apps aren't replacing traditional therapy, but they're providing valuable support between sessions and helping patients develop coping skills they can use anytime."</p>
      
      <h2>Future Directions</h2>
      <p>Researchers are working on developing more sophisticated apps that can adapt to individual user needs and provide personalized interventions. AI-powered chatbots and virtual therapists are also being tested for their effectiveness in providing mental health support.</p>
    `,
    tags: ["Mental Health", "Digital Therapeutics", "Apps", "Anxiety", "Depression"],
    relatedArticles: [3, 4],
  },
}

interface NewsArticlePageProps {
  params: {
    id: string
  }
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  const article = newsArticles[Number.parseInt(params.id) as keyof typeof newsArticles]

  if (!article) {
    return (
      <PageLayout>
        <SectionContainer background="white" size="lg">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/news">
              <Button className="bg-green-500 hover:bg-green-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
        </SectionContainer>
      </PageLayout>
    )
  }

  const relatedArticles = article.relatedArticles
    .map((id) => newsArticles[id as keyof typeof newsArticles])
    .filter(Boolean)

  return (
    <PageLayout>
      <SectionContainer background="white" size="lg">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/news">
            <Button variant="ghost" className="gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {article.category}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-8">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Bookmark className="w-4 h-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Heart className="w-4 h-4" />
              Like
            </Button>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Author Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{article.author}</h3>
                <p className="text-gray-600">Medical Professional & Health Writer</p>
                <p className="text-sm text-gray-500 mt-1">
                  Specializing in {article.category.toLowerCase()} and evidence-based healthcare reporting
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {relatedArticle.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{relatedArticle.readTime}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedArticle.title}</h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedArticle.excerpt}</p>
                      <Link href={`/news/${relatedArticle.id}`}>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Read Article
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionContainer>
    </PageLayout>
  )
}
