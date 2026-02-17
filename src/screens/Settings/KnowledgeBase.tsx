import { useContext, useEffect } from 'react'
import { OptionsContext } from '../../providers/options'

const KNOWLEDGE_BASE_URL = 'https://support.chimerawallet.com'

export default function KnowledgeBase() {
  const { goBack } = useContext(OptionsContext)

  useEffect(() => {
    // Open the knowledge base in a new tab and navigate back
    window.open(KNOWLEDGE_BASE_URL, '_blank')
    goBack()
  }, [goBack])

  return null
}
