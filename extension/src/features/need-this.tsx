import { useEffect, useState, type MouseEventHandler } from "react"
import { Button, CountdownButton } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { Label } from "~components/ui/label"
import { Progress } from "~components/ui/progress"
import { Textarea } from "~components/ui/textarea"
import { sendAnalytics } from "~lib/analytics"
import Text from "~options/Text"
import { useModal } from "~components/Modal"

const MIN_WORDS = 5;

type Question = {
  label: string
  title: string
  minWords: number
  content: string
}

const questions: Array<Question> = [
  {
    label: "Need",
    title: "Why do you really need this?",
    minWords: MIN_WORDS,
    content: ""
  },
  {
    label: "Like",
    title: "What do you like about these products?",
    minWords: MIN_WORDS,
    content: ""
  },
  {
    label: "Dislike",
    title: "Why would it be a good idea not to buy this?",
    minWords: MIN_WORDS,
    content: ""
  },
  {
    label: "Alternative",
    title: "What alternatives could you invest your time and money in?",
    minWords: MIN_WORDS,
    content: ""
  }
]


type QuestionaryProps = {
  onComplete: () => void
}

export function Questionary({onComplete}:QuestionaryProps) {
  const {close, scale} = useModal();


  const cancel = () => {
    sendAnalytics("cancel", undefined);
    close();
  }

  const submit = () => {
    close();
    onComplete();
  }

  return <>
        <CardHeader>
          <CardTitle>Reflection Questions</CardTitle>
          <CardDescription>
            Before committing to the purchase, please reflect on the following
            questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Content cancel={cancel} submit={submit} />
        </CardContent>
      </>
}

type ContentProps = {
  submit: () => void
  cancel: () => void
}

function Content({
  submit,
  cancel,
}: ContentProps) {

  const [text, setText] = useState("")
  const [page, setPage] = useState(questions[0].label)
  const [error, setError] = useState<string | null>(null)
  const labels = questions.map((question) => question.label)

  const isLast = labels.indexOf(page) === -1;
  const isFirst = labels.indexOf(page) === 0

  const currentQuestion = questions.find((question) => question.label === page)
  const textfieldSufficient = isLast || text.split(" ").filter((word) => word.length > 0).length >= currentQuestion.minWords


  useEffect(() => {
    if(isLast) return
    currentQuestion.content = text
    if (textfieldSufficient) setError(null)
  }, [text])

  useEffect(() => {
    if(isLast) return
    setText(currentQuestion.content)
  }, [page])

  const onNext: MouseEventHandler = () => {
    if (!isLast && !textfieldSufficient) {
      setError(`Please enter atleast ${currentQuestion.minWords} words`)
      return
    }

    if (!isLast) sendAnalytics("answer", { question: currentQuestion.title, answer: text })

    if (isLast) {
      submit()
      return
    }

    setPage(labels[labels.indexOf(page) + 1])
  }

  const onPrevious: MouseEventHandler = () => {
    if (isFirst) {
      cancel()
      return
    }

    if (isLast) 
      setPage(labels.at(-1));
    else
      setPage(labels[labels.indexOf(page) - 1])
  }

  const onAbort: MouseEventHandler = () => {
    sendAnalytics("wait-abort-shopping", undefined)
    window.location.href = "https://www.google.com";
  }

  if(isLast) {
    return <div className="flex flex-col gap-6 max-w-xl">
    <div className="grid gap-4 max-w-xl">
      {questions.map((question) => (
        <div key={question.label} className="max-w-xl">
          <Label className="font-bold" htmlFor={question.label}>
            {question.title}
          </Label>
          <Text className="text-wrap text-lessmuted-foreground">{question.content}</Text>
        </div>
      ))}
    </div>
    <div className="flex justify-between gap-4">
      <Button variant="abort" className="w-full" onClick={onAbort}>
        Abort shopping
      </Button>
      <CountdownButton countdown={10000} type="submit" className="w-full" onClick={onNext}>
        Continue to purchase
      </CountdownButton>
    </div>
  </div>
  }

  return <>
    <Progress labels={labels} current={page} />
    <div className="flex flex-col gap-6 mt-4">
      <div className="grid gap-2">
        <Label htmlFor={currentQuestion.label}>
          {currentQuestion.title}
        </Label>
        <div className="relative">
          <Textarea
            id={currentQuestion.label}
            className="resize-none h-48"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p
            className={`text-sm absolute bottom-1 right-4 ${textfieldSufficient ? "hidden" : "text-lessdestructive"}`}>
            Mininimum {currentQuestion.minWords} words
          </p>
        </div>
        {error && <p className="text-lessdestructive text-sm">{error}</p>}
      </div>
      <div className="flex justify-between gap-4">
        {isFirst ? <Button variant="abort" className="w-full" onClick={onAbort}>
        Abort shopping
      </Button> : <Button variant="outline" className="w-full" onClick={onPrevious}>
          Previous
        </Button>}
        <Button type="submit" className="w-full" onClick={onNext} disabled={!textfieldSufficient}>
          Next
        </Button>
      </div>
    </div>
  </>
}