import AppLayout from '@src/layouts/AppLayout';
import React, { ReactElement } from 'react'

const ChurnPatternDetectionPage = () => {
  return (
    <div>ChurnPatternDetectionPage</div>
  )
}


ChurnPatternDetectionPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default ChurnPatternDetectionPage