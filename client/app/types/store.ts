/* eslint-disable import/prefer-default-export */
// #region package imports
import { Props } from 'react';
// #endregion package imports

export type Store = {
  // home: IHomePage.IStateProps

  app: {
    apiErrors: boolean;
  };
  auth: {
    role: string;
  };
  modal: {
    modalType: string | null;
  };
  contact: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
  };
  invoice: {
    loaded: boolean;
    buttonDisabled: boolean;
    aiName: string;
    aiCode: string;
    adminName: string;
    orgId: string;
    eventId: string;
    PONumber: string;
    orgIdEventId: string;
    SequenceNumber: string;
    testTotalRounded: number;
    researchOrStudy: string;
    loaned: {
      schoolName: string;
      schoolAddress: string;
      quantity: number;
    }[];
    orderInfo: {
      misgridApproval: string;
      testTotalRounded: number;
      testsByGrade: {
        grade: string;
        essayFlag: boolean;
        testsOrdered: number;
        answerSheetCount: number;
        nonstdTestsOrdered: number;
        coveredByState: boolean;
        coveredByDistrict: boolean;
        misgridRequested?: number;
      }[];
      metadata: {
        AdminCode: string;
        ChildEventId: string;
        DeliveryDate: string;
        AdjustmentStartDate: string;
        AdjustmentEndDate: string;
        EndDate: string;
        StartDate: string;
        WindowId: string;
        showButton: boolean;
      };
      feeReductions: {
        feeWaiverRequested: number;
        feeWaiverInfo: {
          id: number;
          grade: string;
          feeWaiverRequested: number;
        }[];
        students: {
          firstName: string;
          lastName: string;
          // generate random string
          spId: string;
          // random grade
          grade: string;
          // sent to nsat and used to determine if student is eligible for frb
          regId: string;
          selected: boolean;
        }[];
        delta: {
          firstName: string;
          lastName: string;
          // generate random string
          spId: string;
          // random grade
          grade: string;
          // sent to nsat and used to determine if student is eligible for frb
          regId: string;
          selected: boolean;
        }[];
      };
    };
  };
  errors: {
    contact: {
      firstName: string;
      lastName: string;
      email: string;
      jobTitle: string;
    };
    invoice: {
      PONumber: string;
    };
  };

  school: {
    results: {
      query: string;
      aicode: string;
      schoolName: string;
      schoolAddress: string;
      schoolStatus: string;
      schoolAdmins: {
        admin: string;
        testDate: string;
        districtContract: boolean;
        stateContract: string;
        isResearch: string;
        isStudy: string;
        hasInvoice: boolean;
        borrowedLoan: boolean | null;
        frb: boolean | null;
        schoolFees: {
          discount: number | null;
          fee: number | null;
          note: string;
          date: string | null;
        };
        districtFees: {
          discount: number | null;
          fee: number | null;
          note: string;
          date: string | null;
        };
      }[];
    }[];
  };
};
