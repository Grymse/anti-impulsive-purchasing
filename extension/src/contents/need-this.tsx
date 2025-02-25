import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo";
import { useEffect, useRef, useState, type MouseEventHandler } from 'react'
import cssText from "data-text:~style.css"
import "../style.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~components/ui/card";
import { Button } from "~components/ui/button";
import {Progress } from "~components/ui/progress";
import { Textarea } from "~components/ui/textarea";
import { sendAnalytics } from "~lib/analytics";
import { observer } from "~lib/observer";
import { getters } from "~lib/getters";
import { settings } from "~lib/settings";
import { Label } from "~components/ui/label";

 export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
  }

  export const config: PlasmoCSConfig = {
	matches: [
	  // ----- Your original domains -----
	  "https://www.amazon.com/*",
	  "https://www.zalando.dk/*",
	  "https://*.ebay.com/*",
	  "https://www.matas.dk/*",
	  "https://www.proshop.dk/*",
	  "https://www.boozt.com/*",
	  "https://www2.hm.com/*",
  
	  // ----- 100 Shopify domains -----
	  "https://klaedeskabet.dk/*",
	  "https://www.fashionnova.com/*",
	  "https://kyliecosmetics.com/*",
	  "https://colourpop.com/*",
	  "https://jeffreestarcosmetics.com/*",
	  "https://www.gymshark.com/*",
	  "https://www.allbirds.com/*",
	  "https://www.brooklinen.com/*",
	  "https://ruggable.com/*",
	  "https://shop.ruggable.com/*", // subdomain
	  "https://www.chubbiesshorts.com/*",
	  "https://checkout.chubbiesshorts.com/*",
	  "https://www.puravidabracelets.com/*",
	  "https://www.nativecos.com/*",
	  "https://www.hauslabs.com/*",
	  "https://skknbykim.com/*",
	  "https://www.harney.com/*",
	  "https://www.redbullshopus.com/*",
	  "https://tula.com/*",
	  "https://checkout.tula.com/*",
	  "https://shop.tesla.com/*",    // subdomain
	  "https://spiritualgangster.com/*",
	  "https://www.taylorstitch.com/*",
	  "https://www.american-giant.com/*",
	  "https://www.drsquatch.com/*",
	  "https://mejuri.com/*",
	  "https://checkout-uk.mejuri.com/*", // subdomain
	  "https://www.peets.com/*",
	  "https://www.deathwishcoffee.com/*",
	  "https://hellotushy.com/*",
	  "https://www.bando.com/*",
	  "https://www.moroccanoil.com/*",
	  "https://negativeunderwear.com/*",
	  "https://birdies.com/*",
	  "https://naadam.co/*",
	  "https://www.popflexactive.com/*",
	  "https://www.moderncitizen.com/*",
	  "https://greatjonesgoods.com/*",
	  "https://pinklily.com/*",
	  "https://misen.com/*",
	  "https://materialkitchen.com/*",
	  "https://glossier.com/*",
	  "https://hedleyandbennett.com/*",
	  "https://starface.world/*",
	  "https://youthtothepeople.com/*",
	  "https://myhydro.hydroflask.com/*", // subdomain
	  "https://rumpl.com/*",
	  "https://therabody.com/*",
	  "https://aesop.com/*",
	  "https://iliabeauty.com/*",
	  "https://mizzenandmain.com/*",
	  "https://marinelayer.com/*",
	  "https://ohpolly.com/*",
	  "https://happysocks.com/*",
	  "https://tecovas.com/*",
	  "https://*.stance.com/*",
	  "https://spongelle.com/*",
	  "https://trueclassictees.com/*",
	  "https://meundies.com/*",
	  "https://nuggetsofwisdom.com/*",
	  "https://studs.com/*",
	  "https://jackhenry.co/*",
	  "https://luxyhair.com/*",
	  "https://juicycouture.com/*",
	  "https://everlast.com/*",
	  "https://getstix.co/*",
	  "https://skims.com/*",
	  "https://feals.com/*",
	  "https://foursigmatic.com/*",
	  "https://golde.co/*",
	  "https://liquid-iv.com/*",
	  "https://readyjudy.com/*",
	  "https://thesill.com/*",
	  "https://wearlively.com/*",
	  "https://andieswim.com/*",
	  "https://yourparade.com/*",
	  "https://brightland.co/*",
	  "https://omsom.com/*",
	  "https://jenis.com/*",
	  "https://partakefoods.com/*",
	  "https://snowehome.com/*",
	  "https://imperfectfoods.com/*",
	  // Updated Graza domain to www
	  "https://www.graza.co/*",
	  "https://flybyjing.com/*",
	  "https://getmaude.com/*",
	  "https://ugmonk.com/*"
	],
	all_frames: true
  }

type Question = {
	label: string
	title: string
	minWords: number
	content: string
}

const questions : Array<Question> = [
	{
		label: "Need",
		title: "Why do you really need this?",
		minWords: 5,
		content: '',
	},
	{
		label: "Like",
		title: "What do you like about these products?",
		minWords: 5,
		content: '',
	},
	{
		label: "Dislike",
		title: "Why would it be a good idea not to buy this?",
		minWords: 5,
		content: '',
	},
	{
		label: "Alternative",
		title: "What alternatives could you invest your time and money in?",
		minWords: 5,
		content: '',
	}
]


type F = () => void;
let createQuestionary: ({onFinish}: {onFinish: F}) => void;

export default function needThis() {
	const [show, setShow] = useState(false);
	const onFinish = useRef<null | F>(null);
	const [text, setText] = useState("");
	const [page, setPage] = useState(questions[0].label);
	const [error, setError] = useState<string | null>(null);
	const labels = questions.map((question) => question.label)
	const currentQuestion = questions.find((question) => question.label === page)

	const textfieldSufficient = text.split(" ").filter((word) => word.length > 0).length >= currentQuestion.minWords
	const isLast = labels.indexOf(page) === labels.length - 1;
	const isFirst = labels.indexOf(page) === 0;

	// Here we assign the function that can be called outside the component.
	// This is a way to communicate between the content script and the popup-questionary.
	createQuestionary = ({onFinish: f}) => {
		setShow(true);
		onFinish.current = f;
	};

	useEffect(() => {
		currentQuestion.content = text;
		if (textfieldSufficient) setError(null);
	}, [text])

	useEffect(() => {
		setText(currentQuestion.content);
	}, [page])

	const onNext: MouseEventHandler = () => {
		if (!textfieldSufficient) {
			setError(`Please enter atleast ${currentQuestion.minWords} words`);	
			return;
		}

		sendAnalytics("answer", { question: currentQuestion.title, answer: text });

		if (isLast) {
			submit();
			return;
		}

		setPage(labels[labels.indexOf(page) + 1])
	};

	const onPrevious: MouseEventHandler = () => {
		if (isFirst) {
			cancel();
			return;
		}

		setPage(labels[labels.indexOf(page) - 1])
	};

	const cancel = () => {
		sendAnalytics("cancel", undefined);
		setShow(false);
	}

	const submit = () => {
		setShow(false);
		onFinish.current?.();
	}

  if (!show) return null;

  const isShopify = document.querySelector('link').href.includes('https://cdn.shopify.com');

  return (
    <div id="popover-questionary" className={`fixed text-base ${isShopify ? 'transform scale-150' : ''} bg-black/75 z-50 w-screen h-screen flex items-center justify-center`} onClick={cancel}>
        <Card className="max-w-xl bg-white" onClick={e => e.stopPropagation()}>
			<CardHeader>
				<CardTitle>Reflection Questions</CardTitle>
				<CardDescription>Before committing to the purchase, please reflect on the following questions.</CardDescription>
			</CardHeader>
			<CardContent>
				<Progress labels={labels} current={page} />
				<div className="flex flex-col gap-6 mt-4">
					<div className="grid gap-2">
						<Label htmlFor={currentQuestion.label}>{currentQuestion.title}</Label>
						<div className="relative">
							<Textarea id={currentQuestion.label} className="resize-none h-48" value={text} onChange={(e) => setText(e.target.value)} />
							<p className={`text-xs absolute bottom-1 right-4 ${textfieldSufficient ? "hidden" : "text-destructive"}`}>Mininimum {currentQuestion.minWords} words</p>
						</div>
						{error && <p className="text-destructive text-sm">{error}</p>}
					</div>
					<div className="flex justify-between gap-4">
						<Button variant="outline" className="w-full" onClick={onPrevious}>
							{isFirst ? "Cancel" : "Previous"}
						</Button>
						<Button type="submit" className="w-full" onClick={onNext}>
								{isLast ? "Continue to purchase" : "Next"}
						</Button>
					</div>
				</div>
			</CardContent>
        </Card>
    </div>
  )
}

const onPlaceOrderClick = (e: Event) => {
	
	const isBlocked = document.body.getAttribute('data-plasmo-place-order-blocked') === "true";
	if (!isBlocked) return; // If the button is not blocked, we don't need to show the questionary.

	e.preventDefault();
	e.stopPropagation();

	createQuestionary({onFinish: () => {
			document.body.setAttribute('data-plasmo-place-order-blocked','false');

			const button = e.target as HTMLButtonElement;
			button.click();
		}
	});
}

settings.onInit((settings) => {
	if (!settings.active || !settings.activeStrategies.includes('need-this')) return;

	observer.addEffect((signal) => {
		document.body.setAttribute('data-plasmo-place-order-blocked','true');
	
		getters.getDomainGetters().placeOrderButtons(document.body).forEach((button) => {
			button.addEventListener("click", onPlaceOrderClick);
		}, signal);
	});
});