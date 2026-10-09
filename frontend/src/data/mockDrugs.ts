export interface Drug {
  id: string;
  name: string;
  brandNames: string[];
  category: string;
  description: string;
  mechanism: string;
  dosage: string;
  sideEffects: string[];
  interactions: {
    targetDrugId: string;
    targetDrugName: string;
    severity: 'Severe' | 'Moderate' | 'Mild';
    description: string;
  }[];
  structure3D?: {
    formula: string;
    molecularWeight: string;
    pubchemCid: string;
  };
}

export const MOCK_DRUGS: Drug[] = [
  {
    id: 'digoxin',
    name: 'Digoxin',
    brandNames: ['Lanoxin'],
    category: 'Cardiac Glycosides',
    description: 'Digoxin là một glycoside tim được sử dụng để điều trị suy tim và hạ nhịp tim ở bệnh nhân rung nhĩ.',
    mechanism: 'Ức chế enzym Na+/K+-ATPase, làm tăng nồng độ natri nội bào và tăng sức co bóp cơ tim.',
    dosage: '0.125 mg - 0.25 mg hàng ngày theo chỉ định của bác sĩ.',
    sideEffects: ['Buồn nôn', 'Loạn nhịp tim', 'Nhìn mờ hoặc nhìn thấy quầng vàng-xanh', 'Chóng mặt'],
    interactions: [
      {
        targetDrugId: 'amiodarone',
        targetDrugName: 'Amiodarone',
        severity: 'Severe',
        description: 'Amiodarone làm tăng nồng độ Digoxin trong máu lên đến 70-100%, nguy cơ ngộ độc Digoxin rất cao.'
      },
      {
        targetDrugId: 'furosemide',
        targetDrugName: 'Furosemide',
        severity: 'Moderate',
        description: 'Furosemide làm hạ Kali máu, làm tăng độc tính của Digoxin trên tim.'
      }
    ],
    structure3D: {
      formula: 'C41H64O14',
      molecularWeight: '780.9 g/mol',
      pubchemCid: '2724385'
    }
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    brandNames: ['Cordarone', 'Pacerone'],
    category: 'Antiarrhythmics (Class III)',
    description: 'Amiodarone là thuốc chống loạn nhịp tim nhóm III dùng điều trị các chứng loạn nhịp thất và trên thất nghiêm trọng.',
    mechanism: 'Kéo dài thời gian điện thế hoạt động và thời kỳ trơ của tế bào cơ tim thông qua việc chẹn kênh Kali.',
    dosage: '200 mg - 400 mg hàng ngày.',
    sideEffects: ['Độc tính trên phổi', 'Rối loạn chức năng tuyến giáp', 'Lắng đọng giác mạc', 'Nhạy cảm ánh sáng'],
    interactions: [
      {
        targetDrugId: 'digoxin',
        targetDrugName: 'Digoxin',
        severity: 'Severe',
        description: 'Amiodarone làm giảm độ thanh thải của Digoxin, làm tăng nguy cơ nhiễm độc Digoxin.'
      },
      {
        targetDrugId: 'warfarin',
        targetDrugName: 'Warfarin',
        severity: 'Severe',
        description: 'Amiodarone ức chế chuyển hóa Warfarin qua CYP2C9, làm tăng đáng kể nguy cơ xuất huyết.'
      }
    ],
    structure3D: {
      formula: 'C25H29I2NO3',
      molecularWeight: '645.3 g/mol',
      pubchemCid: '2157'
    }
  },
  {
    id: 'warfarin',
    name: 'Warfarin',
    brandNames: ['Coumadin', 'Jantoven'],
    category: 'Anticoagulants',
    description: 'Warfarin là thuốc chống đông máu nhóm kháng Vitamin K, phòng ngừa và điều trị huyết khối tĩnh mạch, tắc mạch phổi.',
    mechanism: 'Ức chế enzym Vitamin K epoxide reductase (VKORC1), làm giảm tổng hợp các yếu tố đông máu phụ thuộc Vitamin K (II, VII, IX, X).',
    dosage: '2 mg - 5 mg hàng ngày, điều chỉnh theo chỉ số INR.',
    sideEffects: ['Chảy máu bất thường', 'Bầm tím', 'Ho ra máu', 'Đau đầu nghiêm trọng'],
    interactions: [
      {
        targetDrugId: 'amiodarone',
        targetDrugName: 'Amiodarone',
        severity: 'Severe',
        description: 'Làm tăng tác dụng chống đông của Warfarin và kéo dài chỉ số INR.'
      },
      {
        targetDrugId: 'aspirin',
        targetDrugName: 'Aspirin',
        severity: 'Severe',
        description: 'Phối hợp làm tăng mạnh nguy cơ xuất huyết tiêu hóa do ức chế tiểu cầu cộng hưởng với chống đông.'
      }
    ],
    structure3D: {
      formula: 'C19H16O4',
      molecularWeight: '308.33 g/mol',
      pubchemCid: '54678486'
    }
  },
  {
    id: 'furosemide',
    name: 'Furosemide',
    brandNames: ['Lasix'],
    category: 'Loop Diuretics',
    description: 'Furosemide là thuốc lợi tiểu quai được chỉ định trong điều trị phù do suy tim, xơ gan, bệnh thận và tăng huyết áp.',
    mechanism: 'Ức chế đồng vận chuyển Na+/K+/2Cl- ở nhánh lên của quai Henle, tăng đào thải Nước, Na+, K+, Cl-.',
    dosage: '20 mg - 80 mg hàng ngày.',
    sideEffects: ['Hạ Kali máu', 'Hạ huyết áp tư thế', 'Mất nước', 'Tăng uric máu'],
    interactions: [
      {
        targetDrugId: 'digoxin',
        targetDrugName: 'Digoxin',
        severity: 'Moderate',
        description: 'Tăng rủi ro loạn nhịp tim do hạ Kali máu khi dùng chung.'
      }
    ],
    structure3D: {
      formula: 'C12H11ClN2O5S',
      molecularWeight: '330.74 g/mol',
      pubchemCid: '3440'
    }
  },
  {
    id: 'metformin',
    name: 'Metformin',
    brandNames: ['Glucophage', 'Fortamet'],
    category: 'Antidiabetics (Biguanide)',
    description: 'Metformin là thuốc điều trị đái tháo đường týp 2 hàng đầu, giúp hạ đường huyết bằng cách cải thiện độ nhạy insulin.',
    mechanism: 'Giảm sản xuất glucose ở gan, giảm hấp thu glucose ở ruột và tăng thu nhận glucose ở cơ ngoại vi.',
    dosage: '500 mg - 2000 mg hàng ngày cùng bữa ăn.',
    sideEffects: ['Rối loạn tiêu hóa', 'Buồn nôn', 'Tiêu chảy', 'Nhiễm toan lactic (hiếm)'],
    interactions: [],
    structure3D: {
      formula: 'C4H11N5',
      molecularWeight: '129.16 g/mol',
      pubchemCid: '4091'
    }
  }
];
