import React, { useState } from 'react';
import AccordionItem from '@components/admin/AccordionItem';
import AccordionStaffItem from '@components/workers/AccordionStaffItem';
import AccordionStoreServicesItem from '@components/admin/AccordionStoreServicesItem';
import AccordionStoreSubServicesItem from '@components/admin/AccordionStoreSubServicesItem';
import { LayoutAnimation } from 'react-native';

const Components = {
  admin: AccordionItem,
  staff: AccordionStaffItem,
  service: AccordionStoreServicesItem,
  subService: AccordionStoreSubServicesItem,
};
function Accordion({ data, type, navigation, serviceId }) {
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
          serviceId={serviceId}
        >
          {item.content}
        </AccordionItem>
      ))}
    </>
  );
}

export default Accordion;
