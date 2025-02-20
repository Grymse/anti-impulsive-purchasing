import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo";
import React, { useState } from 'react'
import cssText from "data-text:~style.css"
 import "../style.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~components/ui/card";
import { Button } from "~components/ui/button";
import { Input } from "~components/ui/input";
import { Label } from "@radix-ui/react-label";
import {Progress } from "~components/ui/progress";
import { Textarea } from "~components/ui/textarea";

 export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
  }

export const config: PlasmoCSConfig = {
    matches: ["https://www.amazon.com/*"], // or specific URLs
    all_frames: true,
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
    document.body


type Question = {
	label: string
	title: string
	subtitle: string
	minWords: number
}

const questions : Array<Question> = [
	{
		label: "Need this?",
		title: "Why do you really need this?",
		subtitle: "Tell us which product you have, that you really need to solve using these products",
		minWords: 5,
	},
	{
		label: "Like",
		title: "What do you like about these products?",
		subtitle: "Tell us what you like about these products",
		minWords: 5,
	},
	{
		label: "Dislike",
		title: "Why would it be a good idea not to buy this?",
		subtitle: "Tell us why you think it would be a good idea not to buy this",
		minWords: 5,
	},
	{
		label: "Alternative",
		title: "What would you buy instead?",
		subtitle: "Tell us what you would buy instead",
		minWords: 5,
	}
]

export default function needThis() {
	const [text, setText] = useState("");
	const [page, setPage] = useState(questions[0].label);
	const labels = questions.map((question) => question.label)
	const currentQuestion = questions.find((question) => question.label === page)

	const textfieldSufficient = text.split(" ").filter((word) => word.length > 0).length >= currentQuestion.minWords
	const isLast = labels.indexOf(page) === labels.length - 1;
	const isFirst = labels.indexOf(page) === 0;

  return (
    <main className="fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center">
        <Card className="max-w-96">
					<CardHeader>
					<CardTitle className="text-2xl">Reflection</CardTitle>
					<CardDescription>
						Before committing to a purchase, write a reflection on the following questions:
					</CardDescription>
					</CardHeader>
					<CardContent>
						<Progress labels={labels} current={page} setCurrent={setPage} />
						<div className="flex flex-col gap-6 mt-4">
							<div className="grid gap-2">
								<Label htmlFor={currentQuestion.label}>{currentQuestion.title}</Label>
								<div className="relative">
									<Textarea id={currentQuestion.label} className="resize-none h-48" value={text} onChange={(e) => setText(e.target.value)} />
									<p className={`text-xs absolute bottom-1 right-4 ${textfieldSufficient ? "hidden" : "text-destructive"}`}>Mininimum {currentQuestion.minWords} words</p>
								</div>
								<Label className="text-muted-foreground text-sm">{currentQuestion.subtitle}</Label>
							</div>
							<div className="flex justify-between flex-row-reverse gap-4">
									<Button type="submit" className="w-full">
											Next
									</Button>
								{isFirst &&
								<Button variant="outline" className="w-full">
									Previous
								</Button>
								}
							</div>
						</div>
					</CardContent>
        </Card>
    </main>
  )
}