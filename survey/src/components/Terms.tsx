import { Card, CardFooter, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from './ui/button';
import MD from './survey/Markdown';

const termsMD = `
### Introduction
Welcome to the survey for Impulse purchasing habits, which is conducted as part of a thesis on fighting impulse purchasing habits. This survey aims to gather insights into consumer behavior to develop strategies to reduce impulse purchases. By participating in this survey, you agree to the following terms and conditions.

### Eligibility
Participation is open to individuals aged 18 and older who are interested in contributing to research aimed at understanding and mitigating impulse purchasing behaviors.

### Voluntary Participation
Participation in this survey is entirely voluntary. You may choose to stop participating at any time without any consequences. There is no obligation to complete the survey once started, and you may decline to answer any questions.

### Data
Collection and Usage The data collected through this survey includes, but is not limited to, responses to questions related to purchasing behavior, demographic information, and consumer habits. All data collected will be anonymized and used solely for academic research purposes related to our study on reducing impulse purchasing behaviour online and subsequent publications or presentations based on this research.

### Confidentiality and Privacy
Your privacy is paramount. Personal data will be processed and stored in a secure manner in compliance with privacy laws (e.g. GDPR, CCPA). Identifiable data, if collected, will not be shared with third parties or used for purposes beyond this research project. The data gathered will be aggregated and analyzed to draw conclusions for the research and will be published in an academic paper. Only non-specific personal information, such as general demographics (e.g., country, age, occupation, education level), will be included in the published results to ensure that participants cannot be identified. All data will be reported in a manner that safeguards anonymity and protects participant privacy.

### Data Security
All collected data will be stored securely using Google's Firestore database service. Only you can access and edit the data provided. Reasonable measures will be taken to protect your data from unauthorized access, loss, or disclosure.

### Liability Disclaimer
While reasonable efforts are made to protect your data, Nicolai Grymer and IT-University of Copenhagen are not liable for any unauthorized access or unforeseen breaches of data that may occur despite best practices.

### Right to Withdraw and Data Removal
Participants who regret their survey responses after submission may request to withdraw their data from the study. To ensure anonymity and the integrity of the research, data removal requests must be made within 30 days of survey completion. After this period, data may be aggregated and anonymized, making it impossible to identify or remove specific entries. If you wish to request data removal, please contact the emails listed below promptly.

### Contact Information
For questions or concerns regarding this survey, your participation, or the data collected, please contact Nicolai Grymer at pronicoxd@gmail.com or ngry@itu.dk

### Consent
By proceeding to participate in this survey, you acknowledge that you have read, understood, and agree to these terms and conditions. Your continued participation serves as your consent to be part of this research under the outlined terms.
`;
export default function Terms() {

    function onGoBack() {
        const url = new URL(window.location.href);
        window.open(url.origin, '_self');
    }

    return <Card className="w-full my-4 max-w-2xl mx-auto">
  <CardHeader>
    <CardTitle className="text-2xl">Terms of Service</CardTitle>
    <CardDescription>A description of the terms of service</CardDescription>
  </CardHeader>
  <CardContent>
    <MD>{termsMD}</MD>
  </CardContent>
    <CardFooter className="gap-4">
        <Button className="w-full" onClick={onGoBack}>Go back</Button>
    </CardFooter>
  </Card>
}