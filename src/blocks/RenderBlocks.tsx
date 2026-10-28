import type { Page } from '@/payload-types'

import { CaseStudyCards } from './components/CaseStudyCards'
import { CtaBanner } from './components/CtaBanner'
import { FaqAccordion } from './components/FaqAccordion'
import { FeatureCards } from './components/FeatureCards'
import { FormBlock } from './components/FormBlock'
import { IndustryGrid } from './components/IndustryGrid'
import { JobsList } from './components/JobsList'
import { LogoMarquee } from './components/LogoMarquee'
import { MediaContent } from './components/MediaContent'
import { Metrics } from './components/Metrics'
import { PostsFeed } from './components/PostsFeed'
import { ProcessSteps } from './components/ProcessSteps'
import { RichContent } from './components/RichContent'
import { ServiceDirectory } from './components/ServiceDirectory'
import { SplitFeature } from './components/SplitFeature'
import { StatsGrid } from './components/StatsGrid'
import { Testimonial } from './components/Testimonial'
import { TrustBadges } from './components/TrustBadges'

type Block = NonNullable<Page['layout']>[number]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<Block['blockType'], React.ComponentType<any>> = {
  logoMarquee: LogoMarquee,
  splitFeature: SplitFeature,
  metrics: Metrics,
  mediaContent: MediaContent,
  featureCards: FeatureCards,
  ctaBanner: CtaBanner,
  statsGrid: StatsGrid,
  industryGrid: IndustryGrid,
  serviceDirectory: ServiceDirectory,
  faqAccordion: FaqAccordion,
  richContent: RichContent,
  processSteps: ProcessSteps,
  caseStudyCards: CaseStudyCards,
  postsFeed: PostsFeed,
  testimonial: Testimonial,
  jobsList: JobsList,
  formBlock: FormBlock,
  trustBadges: TrustBadges,
}

export function RenderBlocks({ blocks }: { blocks?: Page['layout'] }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const Cmp = components[block.blockType]
        return Cmp ? <Cmp key={block.id || i} {...block} /> : null
      })}
    </>
  )
}
