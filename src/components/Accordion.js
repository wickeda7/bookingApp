import React, { useState } from 'react';
import AccordionItem from '@components/admin/AccordionItem';
import AccordionStaffItem from '@components/workers/AccordionStaffItem';
import { LayoutAnimation } from 'react-native';

const Components = {
  admin: AccordionItem,
  staff: AccordionStaffItem,
};
function Accordion({ data, type, navigation }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const AccordionItem = Components[type];
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
          navigation={navigation}
        >
          {item.content}
        </AccordionItem>
      ))}
    </>
  );
}

export default Accordion;
