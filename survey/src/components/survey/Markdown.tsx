import { toast } from '@/hooks/useToast';
import Markdown2 from 'markdown-to-jsx'
import remarkGfm from 'remark-gfm';
// import { Table, TableCell, TableHeader, TableRow } from '../ui/table';

type Props = {
    children: string;
    className?: string;
}

export default function MD({ children, className }: Props) {
    return <>
      <Markdown2
        className={className}
        remarkPlugins={[remarkGfm]}
        options={{
          overrides: {
            h1: {
              component: ({ children }) => <h1 className="my-6 text-4xl font-extrabold tracking-tight lg:text-5xl">{children}</h1>,
            },
            h2: {component:({ children }) => <h2 className="my-6 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{children}</h2>,
        }, h3: {component:({ children }) => (<h3 className="my-6 text-2xl font-semibold tracking-tight">{children}</h3>
        ),
        }, h4: {component:({ children }) => <h4 className="my-6 text-xl font-semibold tracking-tight">{children}</h4>,
        }, p: {component:({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>,
        }, b: {component:({ children }) => <b>{children}</b>,
        }, blockquote: {component:({ children }) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{children}</code></pre>,
        }, ul: {component:({ children }) => <ul className="my-2 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
        }, ol: {component:({ children }) => <ol className="my-2 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
        }, li: {component:({ children }) => <li>{children}</li>,
        }, a: {component:({ children, href }) => 
      <a href={href} className="leading-7 [&:not(:first-child)]:mt-6 font-medium text-primary underline underline-offset-4">{children}</a>,
        }, kbd: {component:() => <kbd className="py-0.5 px-1.5" />,
        }, hr: {component:() => <hr className="my-4 border-muted" />,
        
        }, code: {component:({children}) => { 
          function copyURL() {
            navigator.clipboard.writeText('https://impulse-survey.vercel.app/');
            toast({
              title: "Copied Content",
              description: "The content has been copied to your clipboard",
            })
          }
          
          return <pre className="bg-muted overflow-hidden p-4 rounded-lg">
          <code className='max-w-full w-24' onClick={copyURL}>{children}</code></pre>
        },
        }, pre: {component:({ children }) => (
          <pre className="[&>code]:w-full [&>code]:px-4 [&>code]:py-2">
            {children}
          </pre>
        ),
          }}
        }}
      >
        {children}
      </Markdown2>
      </>
  }