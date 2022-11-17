import AppLayout from '@src/layouts/AppLayout';
import React, { ReactElement } from 'react'

const GsmCustomerAnalysisPage = () => {
  return (
    <div>GsmCustomerAnalysisPage</div>
  )
}

GsmCustomerAnalysisPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default GsmCustomerAnalysisPage