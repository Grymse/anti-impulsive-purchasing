
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PropsWithChildren, useState } from "react"
import { survey } from "./surveySetup"
import { Elements } from "./Elements";
import { useSurvey } from "./useSurvey";
import MD from "./Markdown";
import { toast } from "@/hooks/useToast";
import Crossfire from "react-canvas-confetti/dist/presets/crossfire";

export default function Survey() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const {submit, validate} = useSurvey();
  const maxPage = survey.pages.length + 1;
  const questionsPerPage = survey.pages.map(p => p.elements.length);
  const currentPage = survey.pages[currentPageIndex - 1];

  function getQuestionsOffset(index: number) {
    if(index < 2) return 1;
    if(index === 2) return questionsPerPage[0] + 1;
    return (questionsPerPage[0] + questionsPerPage[1]) / 2;
  }

  function scrollToTop() {
    document.querySelector('main')?.scrollTo({top: 0});
  }

  function next() {
    if(currentPage !== undefined && validate(currentPage.elements).size !== 0) {
      toast({
        title: "Fill out all required fields!",
        duration: 2500,
      });
      return;
    }

    setCurrentPageIndex(page => {
      if (page === maxPage - 1) submit();
      if (page === maxPage) return page;
      scrollToTop();
      return page + 1;
    })
  }

  function prev() {
    setCurrentPageIndex(page => {
      if (page === 0) return page;
      scrollToTop();
      return page - 1;
    })
  }


  if(currentPageIndex == 0) {
    return <PageContainer page={currentPageIndex} maxPage={maxPage} title={survey.title ?? ""} subtitle={survey.subtitle} next={next} nextTitle="Start" >
      {survey.markdown && <MD>{survey.markdown}</MD>}
      <p className="text-muted-foreground text-sm">By continuing, you are accepting our <a className="underline" href={new URL(window.location.href).origin + "/#/terms"} target="_self">Terms & Conditions</a></p>
      <p className="text-muted-foreground text-sm">In case of problems, contact <a href="mailto:pronicoxd@gmail.com" className="underline" target="_blank">this email</a></p>
    </PageContainer>
  }

  if(currentPageIndex === maxPage) {
    return <PageContainer page={currentPageIndex} maxPage={maxPage} title="Thanks for participating" subtitle="We have received your answers, and you can now safely close the window!">
      <MD>{endPageMD}</MD>
      <Crossfire autorun={{ speed: 5, duration: 2500 }} />
    </PageContainer>
  }

  return <PageContainer page={currentPageIndex} maxPage={maxPage} next={next} nextTitle={currentPageIndex === survey.pages.length ? "Submit" : "Next"} prev={prev} title={currentPage.title ?? ""} subtitle={currentPage.subtitle}>
    <Elements elements={currentPage.elements} indexOffset={getQuestionsOffset(currentPageIndex)} />
  </PageContainer>
}

const endPageMD = `
*If you wish to help more, please share the survey with friends and family!*

The following code gives you credits that can be used to get free research participants at SurveySwap.io. 
 
 Go to: https://surveyswap.io/sr/BGYN-H57O-RPFX 
  
 Or, alternatively, enter the code manually: \`BGYN-H57O-RPFX\`
`;

type PageContainerProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  next?: () => void;
  nextTitle?: string;
  prev?: () => void;
  prevTitle?: string;
  maxPage: number;
  page: number;
}>;

function PageContainer({
  title, subtitle, children, next, prev, nextTitle, prevTitle, maxPage, page
}: PageContainerProps) {
  return <Card className="w-full my-4 max-w-2xl mx-auto">
  <CardHeader>
    <CardTitle className="text-2xl">{title}</CardTitle>
    {subtitle && <p className="leading-7 font-light">{subtitle}</p>}
  </CardHeader>
  <CardContent>
    {children}
  </CardContent>
    <CardFooter className="gap-4">
      {prev && <Button onClick={prev} variant="secondary" className="w-full">{prevTitle ?? "Previous"}</Button>}
      {prev && <p className="w-32 text-gray-600">{page} / {maxPage - 1}</p>}
      {next && <Button onClick={next} className="w-full">{nextTitle ?? "Next"}</Button>}
    </CardFooter>
  </Card>
}