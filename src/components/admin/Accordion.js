import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import { LayoutAnimation } from 'react-native';

function Accordion({ data }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  function handleHeaderPress(index) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          expanded={expandedIndex === index}
          onHeaderPress={() => handleHeaderPress(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </>
  );
}

export default Accordion;
