import { countries } from "./countries";

type Meta = {
    title?: string;
    subtitle?: string;
    required?: boolean,
}

type Input = {
    id: number,
}

export type RadioInputType = {
    type: 'RadioInput',
    options?: string[];
    shuffle?: boolean,
} & Input & Meta;

export type DropDownInputType = {
    type: 'DropDownInput',
    options?: string[];
    required?: boolean;
    shuffle?: boolean;
    placeholder?: string;
} & Input & Meta;

export type SelectInputType = {
    type: 'SelectInput',
    options?: string[];
    required?: boolean;
    shuffle?: boolean;
    placeholder?: string;
} & Input & Meta;

export type TextInputType = {
    type: 'TextInput',
    required?: boolean;
    placeholder?: string;
} & Input & Meta;

export type TextFieldInputType = {
    type: 'TextFieldInput',
    required?: boolean;
    placeholder?: string;
} & Input & Meta;

export type RangeInputType = {
    type: 'RangeInput',
    required?: boolean;
    placeholder?: string;
    options?: string[];
} & Input & Meta;

export type CompoundType = {
    type: 'Compound',
    elements?: Element[];
    shuffle?: boolean;
} & Meta;

export type TextType = {
    type: 'Text',
} & Meta;

export type Element = RadioInputType | DropDownInputType | SelectInputType | TextInputType | TextFieldInputType | RangeInputType | CompoundType | TextType;


export type Page = {
elements: Element[];
markdown?: string;
} & Meta;

export type Survey = {
pages: Page[]
markdown?: string;
} & Meta;


function createStrategyCompound(index: number, strategy: StrategyType) : Element {
  const id = 20 + index * 2;
  return {
    type: "Compound",
    elements: [
      {
        title: strategy.strategy,
        subtitle: strategy.example,
        type: "Text",
      },
      {
        id: id,
        title: "Have you tried this strategy before?",
        type: "RadioInput",
        options: ["Yes", "No", "Maybe"],
        required: true,
      },
      {
        id: id+1,
        title: "How effective do you perceive this strategy to be?",
        subtitle: "Rate on scale from 1 (Not effective) to 5 (Very effective).",
        options: ["1", "2", "3", "4", "5"],
        type: "RangeInput",
      },
    ],
    shuffle: false,
  };
}


type StrategyType = {
  strategy: string;
  example: string;
  short: string;
}

export const strategies: StrategyType[] = [{
  short: "Need This?",
  strategy: "Before completing a purchase, ask yourself \"Do I really need this\"?",
example: "You are ready to checkout and pay for the product, and in this moment you stop up and detach yourself from the feeling of excitement over completing the purchase - Here you question yourself \"Do I really need this?\""
},
{
  short: "Enforce Wait Time",
  strategy: "After committing to purchasing a product, enforce a wait-period before completing",
example: "In the midst of buying the product, you either put the shopping cart aside or add the products to a wishlist and wait a predetermined amount of time (e.g. 48 hours). This will dim the feeling of urgency and excitement and give you sufficient time to rationally contemplate the purchase."
},
{
  short: "Visualize Alternatives",
  strategy: "Visualise alternatives to spending money on a particular product (Dream house, investing, donation)",
example: "As you are scrolling through different products, or when you enter checkout, be aware of how buying this particular product at this moment influences your long-term goals. Visualise alternatives you could put your money - Saving up for your dream house, investing the money or donating the money to charity."
},
{
  short: "Reflect Shopping Time",
  strategy: "Reflect on time spent on online shopping",
example: "When exiting a session of looking at/purchasing on online webshops and apps, you reflect on how much of your time it consumes."
},
{
  short: "Look At Reviews",
  strategy: "Understand what you are purchasing by assessing third-party reviews of the item(s)",
example: "Before completing a purchase you look up reviews on Amazon to improve your judgement of the product."
},
{
  short: "Find Second-Hand",
  strategy: "Find second-hand deals similar to the one you are about to purchase",
example: "Before checking out, you search through Facebook Marketplace, Craigslist, Ebay (or your local second-hand dealership) to see if an item similar or identical to this is available."
},
{
  short: "Delete Payment Info",
  strategy: "Delete all saved payment information and shipping addresses, to prolong the purchasing process",
example: "To increase the duration of the checkout process, you have deleted your payment information saved in your browser, and on the webshop. This requires you to get out your credit card and enter the information, which prolongs the purchasing process and gives you more time to reflect on the product(s) you are purchasing."
},
{
  short: "Use Adblocker",
  strategy: "Use adblocker to remove temptation from advertising",
example: "Adblockers is a popular type of internet browser extension that removes ads from websites to improve your browsing experience. In this context, you have installed it to decrease the amount of ads, and thus the amount of tempting marketing, hoping that it will improve your ability to refrain from purchasing impulsively online."
},
{
  short: "Quality Product?",
  strategy: "Ask yourself if this is a quality product with long lifespan/repairability",
example: "Before purchasing the product, you estimate the quality of the product, the lifespan of the product and to which degree you can repair the product in case it breaks. You may also ask yourself whether you would like to use this product excessively, if you had the chance. With this new information, you contemplate whether you still interested in buying this particular product."
},
{
  short: "How Much Use?",
  strategy: "Ask yourself how much time you will use this product",
example: "Before buying the product, you ask yourself how much time you'll actually use it, to get a grasp of the price per use."
},
{
  short: "Block Apps/Sites",
  strategy: "Block webshop/shop-app or disable checkout",
example: "You have chosen to block a specific clothing stores (Zara / H&M etc.) webshop/app as you often impulsively purchase clothes from this store. The blocking mechanism may refer to blocking access, or merely disabling the ability to checkout."
},
{
  short: "Time-Window Buying",
  strategy: "Only allow buying within time-window",
example: `Limit yourself to one of the following buying patterns:
- Over 30 days, you only allowed yourself to buy products on the 1st and 15th
- Over 7 days, you only allowed yourself to buy products on Thursdays
- During the day, you only allowed yourself to complete purchases between 9am and 10am.`
},
{
  short: "Set Purchase Limit",
  strategy: "Set maximum purchases over time",
example: "You set a limit on how many items you can buy from a specific category (Hobbies, clothes, jewellery, electronics etc.) per week/month/year. The number could be set to zero, to withdraw you from purchasing for a given time period."
},
{
  short: "Create Budget",
  strategy: "Create a budget, and limit spending on specific types of purchases",
example: "Before shopping, you put down a budget and limit how much money you are willing to spend in specific categories (hobbies, clothes, jewellery, electronics etc.) per week/month/year."
},
{
  short: "Borrow or Rent",
  strategy: "Find lending/renting alternatives",
example: "Instead of purchasing an item, which you may only use for a short amount of time, you choose to look for lending options available from friends or libraries. If lending is not an option, you also look for rental options."
},
{
  short: "Work-Time Cost",
  strategy: "Visualise hours of work-time instead of price",
example: "You see the price-tag of a $45 t-shirt, and then use your salary at around $15/hr ($9/hr after taxes) to immediately calculate the price into 5 hours of work. You are now aware of how long you need to work in order to buy this shirt."
},
{
  short: "Do Alternative Activity",
  strategy: "Stop yourself in midst of shopping to find alternative activities (e.g. hobby, learn, entertainment)",
example: "After browsing a webshop/app for some time, you remind yourself that the type of feeling that shopping gives you, is achievable through cheaper means, like enjoying hobbies, learning, entertainment, games etc. You exit the webshop to play a video game instead."
},
{
  short: "Avoid Identical Products",
  strategy: "Being aware of purchasing items similar to existing ones",
example: "When purchasing an item, you reflect on whether you already own an item similar or identical to it. If so, you ask yourself, whether you are willing to replace the old one with this one, or if the original item is broken and how you intend to take better care of this one."
},
{
  short: "Eco Impact Check",
  strategy: "Reflect on time, space and environmental cost (CO2 & waste generated) of the product",
example: `Before completing a purchase, you reflect on the following questions:
- How much of your time it will consume to use and take care of.
- How much space it takes up.
- The environmental cost (CO2 & waste generated) of buying this product.`
},
{
  short: "Corporate Reflection",
  strategy: "Remind yourself of the corporations agenda and it's potential use of psychological marketing",
example: "Before completing a purchase, you zoom out of the experience to reflect on the capitalistic agenda of the corporation trying to convince you to buy their product(s). They may be willing to use psychological marketing tricks or exaggerate the product's quality/effectivity in pursuit of their goals."
},
{
  short: "Emotionally Self-aware",
  strategy: "When purchasing, ask yourself which feelings you are experiencing, that leads you to want to buy",
example: "You are in the midst of ordering clothes, but before checkout you ask yourself what feelings you are experiencing - You continue to ask whether you genuinely need this specific piece of clothes, or if you're coping with boredom/sadness by shopping. You now try to embrace this feeling, to understand why you are feeling this way"}
]

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const strategiesPage: Page = {
  title: "Anti-Impulse Purchasing Strategies",
  subtitle: "In this section, we will explore 21 strategies aimed at reducing impulse purchases. Your feedback will aid in identifying effective methods to promote mindful shopping and support the decrease of impulse online purchasing habits.",
  elements: shuffleArray(strategies.map((strategy, i) => createStrategyCompound(i, strategy))).map((e,i) => {

    //@ts-expect-error Inject Strategy number
    e.elements[0].title = "Strategy " + (i+1) + ": " + e.elements[0].title;
    return e;
  })
}

const aboutYou: Page = {
  title: "About You",
  subtitle: "This section includes general demographic information, allowing us to analyze trends and patterns in online shopping behaviors across different groups. Your responses are anonymous and will be used solely to improve our research on online impulse purchasing habits.",
  elements: [
  {
    id: 1,
    title: "Age",
    type: "RadioInput",
    options: [
      "Under 18",
      "18-24",
      "25-34",
      "35-44",
      "45-54",
      "55-64",
      "65+"
    ],
    required: true
  },
  {
    id: 2,
    title: "Gender",
    type: "RadioInput",
    options: [
      "Male",
      "Female",
      "Non-binary / Gender diverse",
      "Other",
      "Prefer not to say"
    ],
    required: true
  },
  {
    id: 3,
    title: "Country",
    type: "DropDownInput",
    placeholder: "Select your country",
    options: countries,
    required: true
  },
  {
    id: 4,
    title: "Current Occupation",
    type: "RadioInput",
    options: [
      "Prefer not to say",
      "Unemployed",
      "Secondary / High School",
      "Undergraduate",
      "Graduate / Postgraduate",
      "Self-employed / Business Owner",
      "Full-time Employee",
      "Part-time Employee",
      "Freelancer / Gig Worker",
      "Seasonal / Contract Worker"
    ],
    required: true
  },
  {
    id: 5,
    title: "Industry?",
    subtitle: "If you're in education, and your education does not target a specific industry, select no industry",
    type: "RadioInput",
    options: [
      "No industry",
      "Healthcare / Medical",
      "Technology / IT",
      "Education / Academic",
      "Finance / Accounting",
      "Retail / Sales",
      "Manufacturing / Construction",
      "Arts / Entertainment",
      "Government / Public Sector",
      "Hospitality / Service Industry",
      "Non-profit / Social Work",
      "Design / Creative Work",
      "Other"
    ],
    required: true
  }],
};

const aboudImpulsePurchases = `
Impulse buying is unreflective, with little evaluation or consideration of consequences. Attention is on immediate gratification rather than solving a need, making impulsive purchases quick and often unplanned. Impulse buying occurs when a consumer experiences a sudden, often powerful and persistent urge to buy something immediately. The impulse to buy is hedonically complex and may stimulate emotional conflict.

**Examples of online impulse purchases:**
- You're scrolling through social media and see an ad for a cozy blanket on sale. Without planning, you click and buy it within minutes.
- While playing a mobile game, a limited-time pack of in-game currency pops up, promising extra bonuses if purchased immediately. You tap "buy" to get it.
- You receive an email about a 50% discount on noise-cancelling headphones from your favorite tech store. Excited, you click and purchase directly from the link.
- On a popular e-commerce site, a bundle of skincare products is recommended during checkout at a discount. You add it to your order impulsively.
- You're browsing a clothing website out of boredom and see a dress you like. Without thinking you add it to your cart and complete the purchase.
`

const impulsePurchases: Page = {
  title: "Online Impulse Purchases",
  subtitle: "This section will explore your habits and attitudes toward online impulse purchasing.",
  elements: [
    {
      type: "Text",
      title: "Online Impulse Purchases",
      subtitle: aboudImpulsePurchases,
    },
    {
      id: 6,
      title: "How often do you purchase products online on impulse?",
      type: "RadioInput",
      options: [
        "Daily",
        "Multiple times a week",
        "Once a week",
        "2-3 times a month",
        "Once a month",
        "Once every three months",
        "Rarely / Never"
      ],
      required: true
    },
    {
      id: 10,
      title: "What categories of products are you likely to purchase on impulse online?",
      subtitle: "You can choose multiple options. If you do not purchase impulsively online, leave this unanswered.",
      type: "SelectInput",
      options: [
        "Electronics and Gadgets",
        "Clothing and Accessories",
        "Health and Beauty Products",
        "Home and Garden",
        "Food and Beverages",
        "Toys and Games",
        "Books and Media",
        "Sports and Fitness Equipment",
        "Travel and Experiences"
      ],
      shuffle: false,
    },
    {
      id: 7,
      title: "I find it hard to resist online impulse purchases",
      type: "RadioInput",
      options: [
        "Strongly agree",
        "Agree",
        "Neither agree nor disagree",
        "Disagree",
        "Strongly disagree"
      ],
      required: true
    },
    {
      id: 8,
      title: "I would like to decrease my online impulse purchasing",
      type: "RadioInput",
      options: [
        "Strongly agree",
        "Agree",
        "Neither agree nor disagree",
        "Disagree",
        "Strongly disagree"
      ],
      required: true
    },
    {
      id: 9,
      title: "I often regret my impulse purchases",
      type: "RadioInput",
      options: [
        "Strongly agree",
        "Agree",
        "Neither agree nor disagree",
        "Disagree",
        "Strongly disagree"
      ],
      required: true
    },
    {
      id: 11,
      title: "I am interested in trying tools that help reduce online impulse purchases",
      type: "RadioInput",
      options: [
        "Strongly agree",
        "Agree",
        "Neither agree nor disagree",
        "Disagree",
        "Strongly disagree"
      ],
      required: true
    },
    {
      id: 12,
      title: "Can you think of any features that you would find helpful in an anti-impulse shopping tool?",
      subtitle: "Optional",
      type: "TextFieldInput",
      placeholder: "Enter your suggestions here",
      required: false
    }
  ]
};

export const survey: Survey = {
  title: "Online Impulse Purchasing Habits",
  markdown: `
This survey is about finding ways to help people avoid making quick, unplanned purchases when shopping online. We want to learn about the different tools or methods that might help people control these impulse buys. We’re also interested in knowing what kinds of products people most often buy on impulse.

Your answers will help us understand how to make online shopping habits greener and more thoughtful by reducing unnecessary purchases. Your responses are anonymous and will be used solely to improve our research on impulse purchasing habits.


**The survey takes approximately 12 minutes**

The survey is split three ways
- Information about you
- General impulse purchases online
- Concrete strategies to combat impulse purchases online

Thank you for dedicating time to complete this survey! It helps us a lot!

*P.S: This survey contains credits to get free survey responses at SurveySwap.io*
  `,
  pages: [aboutYou, impulsePurchases, strategiesPage],
}

export const questions = survey.pages.flatMap(p => p.elements)
                                      .flatMap(e => e.type === "Compound" ? e.elements : e)
                                      .filter(e => e !== undefined)
                                      .filter(e => e.type === "RadioInput" || e.type ==
                                        "DropDownInput" || e.type ==
                                        "SelectInput" || e.type ==
                                        "TextInput" || e.type ==
                                        "TextFieldInput" || e.type ==
                                        "RangeInput");
