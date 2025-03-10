import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const BoxInfo = ({ children, additionalContent, title, startShow = true }) => {
  return (
    <Accordion
      type="single"
      defaultValue={startShow ? 'item' : undefined}
      collapsible
    >
      <AccordionItem value="item">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          {children}
          {additionalContent}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BoxInfo;
