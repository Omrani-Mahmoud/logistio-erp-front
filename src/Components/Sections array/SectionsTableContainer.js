import React from 'react'
import SectionsTable from './SectionsTable'

function SectionsTableContainer() {

    const [choosedSection, setChoosedSection] = React.useState('');
    const handleChoosedSectionChange = (event) => {
        setChoosedSection(event.target.value)
      };

    return (
      <SectionsTable choosedSection={choosedSection} handleChoosedSectionChange={handleChoosedSectionChange} />
    )
}

export default SectionsTableContainer
