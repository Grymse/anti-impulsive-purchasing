import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"

import "../style.css"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~components/ui/accordion"
import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { sendAnalytics } from "~lib/analytics"
import { getters } from "~lib/getters"
import { observer } from "~lib/observer"
import { settings } from "~lib/settings"
import { useScaling } from "~hooks/useScaling"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: [
    // ----- Danish Domains -----
    "https://*.amazon.de/*",
    "https://*.amazon.co.uk/*",
    "https://*.amazon.se/*",
    "https://*.ebay.co.uk/*",
    "https://*.ebay.de/*",
    "https://*.harald-nyborg.dk/*",
    "https://jysk.dk/*",
    "https://*.zalando.dk/*",
    "https://*.matas.dk/*",
    "https://*.proshop.dk/*",
    "https://*.elgiganten.dk/*",
    "https://*.magasin.dk/*",
    "https://*.jemogfix.dk/*",
    "https://*.bilka.dk/*",
    "https://*.foetex.dk/*",
    "https://*.saxo.com/*",
    "https://*.thansen.dk/*",
    "https://*.imerco.dk/*",
    "https://*.xl-byg.dk/*",
    "https://*.sport24.dk/*",
    "https://*.bog-ide.dk/*",
    "https://*.power.dk/*",
    "https://*.Plantorama.dk/*",
    "https://*.kop-kande.dk/*",
    "https://*.avxperten.dk/*",
    "https://*.fleggaard.dk/*",
    "https://ilva.dk/*",
    "https://*.sportsworld.dk/*",
    "https://*.telenor.dk/*",
    "https://*.kids-world.dk/*",
    "https://*.telia.dk/*",
    "https://*.10-4.dk/*",
    "https://*.asos.com/*",
    "https://*.billigvvs.dk/*",
    "https://intersport.dk/*",
    "https://*.ticketmaster.dk/*",
    "https://*.telmore.dk/*",
    "https://*.ditur.dk/*",
    "https://*.quint.dk/*",
    "https://*.maxizoo.dk/*",
    "https://*.fribikeshop.dk/*",
    "https://*.just-eat.dk/*",
    "https://*.bygma.dk/*",
    "https://*.williamdam.dk/*",
    "https://*.av-cables.dk/*",
    "https://*.plantetorvet.dk/*",
    "https://salling.dk/*",
    "https://luksusbaby.dk/*",
    "https://*.apotekeren.dk/*",
    "https://*.lampeguru.dk/*",
    "https://*.billetlugen.dk/*",
    "https://*.computersalg.dk/*",
    "https://havehandel.dk/*",
    "https://*.sinful.dk/*",
    "https://*.kaufmann.dk/*",
    "https://*.callme.dk/*",
    "https://*.hyggeonkel.dk/*",
    "https://legeakademiet.dk/*",
    "https://*.lampemesteren.dk/*",
    "https://*.zooplus.dk/*",
    "https://*.loebeshop.dk/*",
    "https://loberen.dk/*",
    "https://*.cocopanda.dk/*",
    "https://*.calle.dk/*",
    "https://*.mytrendyphone.dk/*",
    "https://*.jacobsenplus.dk/*",
    "https://greenmind.dk/*",
    "https://*.cchobby.dk/*",
    "https://*.komplett.dk/*",
    "https://*.billigparfume.dk/*",
    "https://*.faraos.dk/*",
    "https://*.feline.dk/*",
    "https://*.kitchenone.dk/*",
    "https://moebelkompagniet.dk/*",
    "https://*.luxoliving.dk/*",
    "https://*.av-connection.dk/*",
    "https://sneakerzone.dk/*",
    "https://*.partyking.dk/*",
    "https://*.bygmax.dk/*",
    "https://*.daells-bolighus.dk/*",
    "https://*.greenline.dk/*",
    "https://*.punkt1.dk/*",
    "https://*.illumsbolighus.dk/*",
    "https://*.lirumlarumleg.dk/*",
    "https://*.coolstuff.dk/*",
    "https://*.mobilcovers.dk/*",
    "https://*.grejfreak.dk/*",
    "https://*.flugger.dk/*",
    "https://ingvardchristensen.dk/*",
    "https://mobler.dk/*",
    "https://*.adidas.dk/*",

    // ----- Common domains -----
    "https://*.shein.com/*",
    "https://*.apple.com/*",
    "https://*.hm.com/*",
    "https://*.boozt.com/*",
    "https://*.temu.com/*",

    // ----- American domains -----
    "https://*.ebay.com/*",
    "https://*.amazon.com/*",
    "https://*.target.com/*",
    "https://*.homedepot.com/*",
    "https://*.costco.com/*",
    "https://*.bestbuy.com/*",
    "https://*.costco.com/*",
    "https://*.kroger.com/*",
    "https://*.aliexpress.com/*",
    "https://*.etsy.com/*",
    "https://*.adidas.com/*",
    "https://*.samsung.com/*",
    "https://*.nike.com/*",
    "https://*.wayfair.com/*",
    "https://*.lowes.com/*",
    "https://*.macys.com/*",
    "https://*.chewy.com/*",
    "https://*.gap.com/*",
    "https://*.wish.com/*",
    "https://*.lg.com/*",
    "https://*.dell.com/*",
    "https://*.kohls.com/*",
    "https://*.walgreens.com/*",
    "https://*.lenovo.com/*",
    "https://*.zara.com/*",
    "https://*.hp.com/*",
    "https://*.ikea.com/*",
    "https://*.nordstrom.com/*",

    // ----- 100 Shopify domains -----
    "https://klaedeskabet.dk/*",
    "https://*.fashionnova.com/*",
    "https://kyliecosmetics.com/*",
    "https://colourpop.com/*",
    "https://jeffreestarcosmetics.com/*",
    "https://*.gymshark.com/*",
    "https://*.allbirds.com/*",
    "https://*.brooklinen.com/*",
    "https://ruggable.com/*",
    "https://*.ruggable.com/*", // subdomain
    "https://*.chubbiesshorts.com/*",
    "https://*.chubbiesshorts.com/*",
    "https://*.puravidabracelets.com/*",
    "https://*.nativecos.com/*",
    "https://*.hauslabs.com/*",
    "https://skknbykim.com/*",
    "https://*.harney.com/*",
    "https://*.redbullshopus.com/*",
    "https://tula.com/*",
    "https://*.tula.com/*",
    "https://*.tesla.com/*", // subdomain
    "https://spiritualgangster.com/*",
    "https://*.taylorstitch.com/*",
    "https://*.american-giant.com/*",
    "https://*.drsquatch.com/*",
    "https://mejuri.com/*",
    "https://*.mejuri.com/*",
    "https://*.peets.com/*",
    "https://*.deathwishcoffee.com/*",
    "https://hellotushy.com/*",
    "https://*.bando.com/*",
    "https://*.moroccanoil.com/*",
    "https://negativeunderwear.com/*",
    "https://birdies.com/*",
    "https://naadam.co/*",
    "https://*.popflexactive.com/*",
    "https://*.moderncitizen.com/*",
    "https://greatjonesgoods.com/*",
    "https://pinklily.com/*",
    "https://misen.com/*",
    "https://materialkitchen.com/*",
    "https://*.hedleyandbennett.com/*",
    "https://*.rumpl.com/*",
    "https://*.mizzenandmain.com/*",
    "https://ohpolly.com/*",
    "https://*.tecovas.com/*",
    "https://*.stance.com/*",
    "https://spongelle.com/*",
    "https://*.trueclassictees.com/*",
    "https://*.meundies.com/*",
    "https://studs.com/*",
    "https://jackhenry.co/*",
    "https://*.luxyhair.com/*",
    "https://juicycouture.com/*",
    "https://*.everlast.com/*",
    "https://*.skims.com/*",
    "https://feals.com/*",
    "https://*.foursigmatic.com/*",
    "https://golde.co/*",
    "https://*.liquid-iv.com/*",
    "https://*.thesill.com/*",
    "https://*.wearlively.com/*",
    "https://andieswim.com/*",
    "https://yourparade.com/*",
    "https://brightland.co/*",
    "https://omsom.com/*",
    "https://jenis.com/*",
    "https://snowehome.com/*",
    "https://*.graza.co/*",
    "https://*.flybyjing.com/*",
    "https://getmaude.com/*",
    "https://ugmonk.com/*"
  ],
  all_frames: true
}

// Define the alternative activities data structure
type ActivityCategory = {
  id: string
  title: string
  description: string
  icon: string
  color: string
  activities: Activity[]
}

type Activity = {
  id: string
  title: string
  description: string
  icon?: string
  examples: string[]
  resources?: {
    name: string
    url: string
  }[]
}

// Define alternative activities
const alternativeActivities: ActivityCategory[] = [
  {
    id: "physical",
    title: "Physical Activities",
    description:
      "Engage your body with these physical activities that promote health and wellbeing.",
    icon: "🏃‍♀️",
    color: "bg-green-50 border-green-200",
    activities: [
      {
        id: "workout",
        title: "Home Workout",
        description: "Exercise at home with minimal or no equipment required.",
        icon: "💪",
        examples: [
          "Follow a 20-minute yoga sequence on YouTube",
          "Do a bodyweight circuit (push-ups, squats, lunges, planks)",
          "Try a new HIIT workout",
          "Dance to your favorite music for 15 minutes"
        ],
        resources: [
          {
            name: "Fitness Blender",
            url: "https://www.fitnessblender.com/videos"
          },
          {
            name: "Yoga With Adriene",
            url: "https://yogawithadriene.com/free-yoga-videos/"
          }
        ]
      },
      {
        id: "outdoor",
        title: "Outdoor Activities",
        description: "Explore the outdoors and connect with nature.",
        icon: "🌳",
        examples: [
          "Go for a walk or hike in a local park",
          "Ride a bicycle around your neighborhood",
          "Try gardening or plant something new",
          "Have a picnic in a nearby green space"
        ]
      }
    ]
  },
  {
    id: "creative",
    title: "Creative Expression",
    description:
      "Explore your creative side with these artistic and expressive activities.",
    icon: "🎨",
    color: "bg-purple-50 border-purple-200",
    activities: [
      {
        id: "art",
        title: "Visual Arts",
        description:
          "Express yourself through drawing, painting, or other visual media.",
        icon: "🖌️",
        examples: [
          "Sketch something in your surroundings",
          "Start a watercolor painting",
          "Try digital art with free software",
          "Create a collage from magazines or found materials"
        ],
        resources: [
          {
            name: "Skillshare Art Classes",
            url: "https://www.skillshare.com/browse/art"
          },
          {
            name: "DrawSpace Tutorials",
            url: "https://www.drawspace.com/lessons"
          }
        ]
      },
      {
        id: "craft",
        title: "Crafts & DIY",
        description: "Create something with your hands.",
        icon: "✂️",
        examples: [
          "Upcycle something you already own",
          "Make homemade cards for upcoming occasions",
          "Try origami or paper crafts",
          "Start a simple knitting or crochet project"
        ]
      },
      {
        id: "writing",
        title: "Writing & Journaling",
        description: "Express yourself through words.",
        icon: "✏️",
        examples: [
          "Write a short story or poem",
          "Start a gratitude journal",
          "Write a letter to your future self",
          "Try creative writing prompts"
        ]
      }
    ]
  },
  {
    id: "learning",
    title: "Learning & Growth",
    description: "Invest in yourself by learning something new.",
    icon: "🧠",
    color: "bg-blue-50 border-blue-200",
    activities: [
      {
        id: "skills",
        title: "Skill Development",
        description: "Learn or improve a practical skill.",
        icon: "🔧",
        examples: [
          "Take a free online course in a subject you're curious about",
          "Learn the basics of a new language",
          "Master a new cooking technique",
          "Practice a musical instrument (or start learning one)"
        ],
        resources: [
          {
            name: "Coursera Free Courses",
            url: "https://www.coursera.org/courses?query=free"
          },
          { name: "Duolingo", url: "https://www.duolingo.com/" }
        ]
      },
      {
        id: "books",
        title: "Reading",
        description: "Explore new worlds and ideas through books.",
        icon: "📚",
        examples: [
          "Start a book you've been meaning to read",
          "Join an online book club",
          "Read articles or essays on topics that interest you",
          "Listen to an audiobook while doing chores"
        ],
        resources: [
          { name: "Project Gutenberg", url: "https://www.gutenberg.org/" },
          { name: "Goodreads", url: "https://www.goodreads.com/" }
        ]
      }
    ]
  },
  {
    id: "relaxation",
    title: "Relaxation & Mindfulness",
    description:
      "Take care of your mental wellbeing with these calming activities.",
    icon: "🧘",
    color: "bg-teal-50 border-teal-200",
    activities: [
      {
        id: "meditation",
        title: "Meditation",
        description: "Practice mindfulness and meditation.",
        icon: "🧿",
        examples: [
          "Try a guided meditation for beginners",
          "Practice deep breathing for 5 minutes",
          "Do a body scan meditation",
          "Try mindful walking around your home or neighborhood"
        ],
        resources: [
          { name: "Insight Timer", url: "https://insighttimer.com/" },
          { name: "Headspace", url: "https://www.headspace.com/" }
        ]
      },
      {
        id: "self-care",
        title: "Self-Care Rituals",
        description: "Engage in activities that nurture your wellbeing.",
        icon: "🛀",
        examples: [
          "Take a relaxing bath or shower",
          "Create a calming playlist",
          "Declutter a small space in your home",
          "Write down 5 things you're grateful for"
        ]
      }
    ]
  },
  {
    id: "social",
    title: "Social Connection",
    description: "Connect with others in meaningful ways.",
    icon: "👥",
    color: "bg-amber-50 border-amber-200",
    activities: [
      {
        id: "connect",
        title: "Reach Out",
        description: "Strengthen relationships with friends and family.",
        icon: "📱",
        examples: [
          "Call or video chat with a friend you haven't spoken to in a while",
          "Write a thoughtful message to someone you appreciate",
          "Plan a game night (in person or virtual)",
          "Join an online community related to your interests"
        ]
      },
      {
        id: "volunteer",
        title: "Giving Back",
        description: "Help others and contribute to your community.",
        icon: "🤲",
        examples: [
          "Research local volunteer opportunities",
          "Help a neighbor with a task",
          "Donate items you no longer need",
          "Participate in a community clean-up"
        ],
        resources: [
          { name: "VolunteerMatch", url: "https://www.volunteermatch.org/" }
        ]
      }
    ]
  }
]

interface AlternativeActivitiesProps {
  onContinue: () => void
  onCancel: (categoryId?: string, activityId?: string) => void
  initialActivity?: Activity | null
}

function AlternativeActivitiesModal({
  onContinue,
  onCancel,
  initialActivity
}: AlternativeActivitiesProps) {
  // Find category for the initial activity if provided
  const initialCategory = initialActivity
    ? alternativeActivities.find((category) =>
        category.activities.some(
          (activity) => activity.id === initialActivity.id
        )
      )?.id || null
    : null

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  )
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    initialActivity || null
  )
  // If an initial activity is provided, mark as viewed right away
  const [viewed, setViewed] = useState<boolean>(!!initialActivity)

  // Handle when a category is expanded
  const handleCategoryChange = (categoryId: string) => {
    sendAnalytics("alternate_activities_select_category", {
      category: categoryId
    })
    setSelectedCategory(categoryId)
  }

  // Display the detailed view of an activity
  const showActivityDetails = (activity: Activity) => {
    sendAnalytics("alternate_activities_select_activity", {
      activity: activity.id
    })
    setSelectedActivity(activity)

    // Mark as viewed only when a specific activity is viewed
    if (!viewed) {
      setViewed(true)
    }
  }

  // Go back to category view
  const handleBack = () => {
    sendAnalytics("alternate_activities_back", {
      from: selectedActivity?.id || ""
    })
    setSelectedActivity(null)
  }

  // Handle continue with purchase button
  const handleContinue = () => {
    sendAnalytics("alternate_activities_continue", { viewed: viewed })
    onContinue()
  }

  // Handle opening external resources
  const handleResourceClick = (url: string, resourceName: string) => {
    sendAnalytics("alternate_activities_resource_click", {
      resource: resourceName,
      activity: selectedActivity?.id || ""
    })
    window.open(url, "_blank")
  }

  // Render detailed activity view
  const renderActivityDetails = () => {
    if (!selectedActivity) return null

    // Find the parent category for styling
    const parentCategory = alternativeActivities.find((category) =>
      category.activities.some(
        (activity) => activity.id === selectedActivity.id
      )
    )

    return (
      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={handleBack}>
          ← Back to categories
        </Button>

        <div className={`p-6 ${parentCategory?.color} rounded-lg border mb-4`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{selectedActivity.icon}</span>
            <h3 className="text-xl font-semibold">{selectedActivity.title}</h3>
          </div>
          <p className="text-gray-600 mb-5">{selectedActivity.description}</p>

          <div className="mb-6 bg-white p-4 rounded-md">
            <h4 className="font-medium mb-3">Try these ideas:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {selectedActivity.examples.map((example, index) => (
                <li key={index} className="text-gray-700">
                  {example}
                </li>
              ))}
            </ul>
          </div>

          {selectedActivity.resources &&
            selectedActivity.resources.length > 0 && (
              <div className="bg-white p-4 rounded-md">
                <h4 className="font-medium mb-3">Helpful resources:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedActivity.resources.map((resource, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="bg-blue-50 hover:bg-blue-100"
                      onClick={() =>
                        handleResourceClick(resource.url, resource.name)
                      }>
                      {resource.name} →
                    </Button>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    )
  }

  // Render the categories with activities
  const renderCategories = () => {
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={selectedCategory || undefined}
        onValueChange={handleCategoryChange}>
        {alternativeActivities.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id}
            className={`border-b ${category.id === selectedCategory ? category.color : ""}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3 w-full">
                <span className="text-2xl">{category.icon}</span>
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">{category.title}</span>
                  <span className="text-sm text-gray-500">
                    {category.description}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-3 pt-2">
                {category.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${category.color}`}
                    onClick={() => showActivityDetails(activity)}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{activity.icon}</span>
                      <h3 className="font-medium">{activity.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      Click for details →
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    )
  }

  const {scale} = useScaling();
  

  return (
    <div
    className="fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center"
    onClick={() => onCancel()}>
      <Card
        style={{
          transform: `scale(${scale})`
        }}
        className="max-w-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}>
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌟</span>
            <div>
              <CardTitle>Discover Alternative Activities</CardTitle>
              <CardDescription className="text-gray-100">
                Instead of shopping, explore these enriching alternatives
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            {selectedActivity ? renderActivityDetails() : renderCategories()}

            <div className="flex justify-between gap-4 mt-4 pt-4 border-t">
              <Button
                variant="outline"
                className="w-full bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                onClick={() => {
                  // Determine which activity and category to pass back
                  const activityId = selectedActivity?.id
                  const categoryId = selectedActivity
                    ? alternativeActivities.find((cat) =>
                        cat.activities.some(
                          (act) => act.id === selectedActivity.id
                        )
                      )?.id
                    : selectedCategory

                  onCancel(categoryId, activityId)
                }}>
                Abort Shopping
              </Button>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                onClick={handleContinue}
                disabled={!viewed}
                title={
                  !viewed
                    ? "Please explore at least one activity first"
                    : undefined
                }>
                {viewed
                  ? "Continue with Purchase"
                  : "Explore an Activity First"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

type F = () => void
let createAlternativeActivities: ({
  onFinish,
  preSelectedActivity
}: {
  onFinish: F
  preSelectedActivity?: Activity
}) => void

export default function AlternateActivities() {
  const [show, setShow] = useState(false)
  const [initialActivity, setInitialActivity] = useState<Activity | null>(null)
  const onFinish = useRef<null | F>(null)

  // Here we assign the function that can be called outside the component
  createAlternativeActivities = ({ onFinish: f, preSelectedActivity }) => {
    setShow(true)
    onFinish.current = f
    if (preSelectedActivity) {
      setInitialActivity(preSelectedActivity)
    } else {
      setInitialActivity(null)
    }
  }

  const handleContinue = () => {
    sendAnalytics("alternate_activities_completed", {
      fromRandomSuggestion: !!initialActivity
    })
    setShow(false)
    onFinish.current?.()
  }

  // Define category-specific search queries mapped to category IDs
  const categorySearchQueries: Record<string, string[]> = {
    // Physical Activities
    physical: [
      "beginner home workout routines no equipment",
      "best outdoor activities near me",
      "health benefits of regular exercise",
      "free yoga classes online beginners",
      "how to start running for beginners"
    ],

    // Creative Expression
    creative: [
      "easy art projects for beginners at home",
      "how to start journaling for mental health",
      "free creative writing prompts",
      "simple DIY crafts with household items",
      "benefits of creative hobbies for mental health"
    ],

    // Learning & Growth
    learning: [
      "best free online courses 2023",
      "how to learn a new language for free",
      "interesting skills to learn at home",
      "free books to read online",
      "educational podcasts for beginners"
    ],

    // Relaxation & Mindfulness
    relaxation: [
      "meditation techniques for beginners",
      "mindfulness exercises for stress reduction",
      "how to create a self-care routine",
      "breathing techniques for anxiety",
      "simple ways to practice mindfulness daily"
    ],

    // Social Connection
    social: [
      "how to strengthen connections with friends",
      "volunteer opportunities near me",
      "ways to build community in my area",
      "free online communities to join",
      "how to make meaningful connections"
    ],

    // General (fallback) searches
    general: [
      "how to practice mindful spending habits",
      "benefits of minimalism lifestyle",
      "how to overcome shopping addiction",
      "saving money tips and tricks",
      "how to find joy without spending money"
    ]
  }

  const handleCancel = (categoryId?: string, activityId?: string) => {
    // Determine which category to use for search
    let categoryToUse = "general"

    // Use passed category if available
    if (categoryId) {
      categoryToUse = categoryId
    }
    // If no category was passed but we have an initial activity
    else if (initialActivity) {
      // For random suggestions, get their category
      const parentCategory = alternativeActivities.find((category) =>
        category.activities.some(
          (activity) => activity.id === initialActivity.id
        )
      )

      if (parentCategory) {
        categoryToUse = parentCategory.id
      }
    }

    // Get the appropriate array of searches for the category
    const relevantSearches =
      categorySearchQueries[categoryToUse] || categorySearchQueries.general

    // Select a random search query from the relevant category
    const randomSearch =
      relevantSearches[Math.floor(Math.random() * relevantSearches.length)]

    sendAnalytics("alternate_activities_aborted_shopping", {
      fromRandomSuggestion: !!initialActivity,
      searchQuery: randomSearch,
      category: categoryToUse,
      activityId: activityId || initialActivity?.id || ""
    })

    setShow(false)

    // Redirect to Google with the selected search
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(randomSearch)}`
  }

  if (!show) return null

  return (
    <AlternativeActivitiesModal
      onContinue={handleContinue}
      onCancel={handleCancel}
      initialActivity={initialActivity}
    />
  )
}

const onPlaceOrderClick = (e: Event) => {
  const isBlocked =
    document.body.getAttribute("data-plasmo-place-order-blocked") === "true"
  if (!isBlocked) return // If the button is not blocked, we don't need to show the modal

  e.preventDefault()
  e.stopPropagation()

  createAlternativeActivities({
    onFinish: () => {
      document.body.setAttribute("data-plasmo-place-order-blocked", "false")

      const button = e.target as HTMLButtonElement
      button.click()
    }
  })
}

// Function to select a random activity from all available activities
const getRandomActivity = (): Activity => {
  // Flatten the activities array from all categories
  const allActivities = alternativeActivities.flatMap(
    (category) => category.activities
  )

  // Select a random activity
  const randomIndex = Math.floor(Math.random() * allActivities.length)
  return allActivities[randomIndex]
}

// Key for storing the last suggestion timestamp in browser storage
const LAST_SUGGESTION_KEY = "alternate_activities_last_suggestion_time"
const SUGGESTION_INTERVAL = 1000 * 10 // 3 minutes

// Function to check if it's time to show a suggestion based on stored timestamp
const shouldShowSuggestion = async (): Promise<boolean> => {
  try {
    const data = await chrome.storage.local.get(LAST_SUGGESTION_KEY)
    const lastSuggestionTime = data[LAST_SUGGESTION_KEY] as number
    const currentTime = Date.now()

    // If no previous suggestion or it's been more than SUGGESTION_INTERVAL since last suggestion
    if (
      !lastSuggestionTime ||
      currentTime - lastSuggestionTime >= SUGGESTION_INTERVAL
    ) {
      return true
    }

    return false
  } catch (error) {
    console.error("Error checking suggestion timing:", error)
    return false
  }
}

// Function to update the last suggestion timestamp
const updateLastSuggestionTime = async (): Promise<void> => {
  try {
    await chrome.storage.local.set({ [LAST_SUGGESTION_KEY]: Date.now() })
  } catch (error) {
    console.error("Error updating suggestion timestamp:", error)
  }
}

// Function to present a random activity suggestion
const showRandomSuggestion = () => {
  // Check if user is still on the page and the extension is active
  if (
    document.hidden ||
    !settings.value.active ||
    !settings.value.activeStrategies.includes("alternate-activities")
  ) {
    return
  }

  // Get a random activity
  const randomActivity = getRandomActivity()

  // Show the modal with pre-selected activity
  createAlternativeActivities({
    onFinish: () => {
      // Update the timestamp when modal is closed
      updateLastSuggestionTime()
    },
    preSelectedActivity: randomActivity
  })

  // Track this random suggestion event
  sendAnalytics("alternate_activities_random_suggestion", {
    activity: randomActivity.id,
    category:
      alternativeActivities.find((category) =>
        category.activities.some((a) => a.id === randomActivity.id)
      )?.id || ""
  })

  // Update the timestamp
  updateLastSuggestionTime()
}

// Function to start checking for suggestion timing
const startSuggestionCheck = () => {
  // Run the check every 5 seconds
  const checkInterval = 5000

  // Set up the interval for checking
  const intervalId = setInterval(async () => {
    // Check if it's time to show a suggestion
    const shouldShow = await shouldShowSuggestion()

    if (shouldShow) {
      showRandomSuggestion()
    }
  }, checkInterval)

  // Return a cleanup function
  return () => {
    clearInterval(intervalId)
  }
}

settings.onInit((settings) => {
  if (
    !settings.active ||
    !settings.activeStrategies.includes("alternate-activities")
  )
    return

  observer.addEffect((signal) => {
    // Set up blocking for purchase buttons
    document.body.setAttribute("data-plasmo-place-order-blocked", "true")

    const domainGetters = getters.getDomainGetters()
    domainGetters.placeOrderButtons(document.body).forEach((button) => {
      button.addEventListener("click", onPlaceOrderClick)
    }, signal)

    domainGetters.getOneClickBuyNow?.(document.body)?.forEach((p) => {
      p.button?.addEventListener("click", onPlaceOrderClick)
    }, signal)

    // Start the suggestion check system
    const cleanup = startSuggestionCheck()

    // If tab becomes visible, check if we should show a suggestion
    document.addEventListener(
      "visibilitychange",
      async () => {
        if (!document.hidden) {
          // Only check but don't force a suggestion
          const shouldShow = await shouldShowSuggestion()
          if (shouldShow) {
            showRandomSuggestion()
          }
        }
      },
      signal
    )

    // Clean up the interval when the effect is cleaned up
    return cleanup
  })
})
