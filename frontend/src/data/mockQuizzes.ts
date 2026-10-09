export interface QuizQuestion {
  id: string;
  question: string;
  category: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const MOCK_QUIZZES: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Thuốc Amiodarone thuộc nhóm thuốc chống loạn nhịp nào theo phân loại Vaughan Williams?',
    category: 'Dược Lý Tim Mạch',
    options: [
      'Nhóm I (Chẹn kênh Natri)',
      'Nhóm II (Chẹn thụ thể Beta)',
      'Nhóm III (Chẹn kênh Kali)',
      'Nhóm IV (Chẹn kênh Canxi)'
    ],
    correctAnswer: 2,
    explanation: 'Amiodarone thuộc Nhóm III theo phân loại Vaughan Williams. Thuốc chủ yếu chẹn kênh Kali kéo dài thời gian điện thế hoạt động và thời kỳ trơ của cơ tim.'
  },
  {
    id: 'q2',
    question: 'Tương tác nghiêm trọng nhất khi phối hợp đồng thời Digoxin và Amiodarone là gì?',
    category: 'Tương Tác Thuốc',
    options: [
      'Amiodarone làm tăng nồng độ Digoxin trong máu dẫn tới nguy cơ ngộ độc Digoxin.',
      'Digoxin làm mất hoàn toàn tác dụng của Amiodarone.',
      'Gây hạ đường huyết đột ngột.',
      'Làm tăng nồng độ Amiodarone và suy thận cấp.'
    ],
    correctAnswer: 0,
    explanation: 'Amiodarone ức chế P-glycoprotein và làm giảm độ thanh thải của Digoxin, dẫn đến tăng nồng độ Digoxin trong huyết tương lên từ 70% đến 100%, gây nguy cơ ngộ độc Digoxin rất cao.'
  },
  {
    id: 'q3',
    question: 'Chỉ số xét nghiệm nào bắt buộc phải theo dõi định kỳ khi bệnh nhân điều trị bằng Warfarin?',
    category: 'Dược Lâm Sàng',
    options: [
      'Chỉ số đường huyết lúc đói (FBG)',
      'Tỷ số chuẩn hóa quốc tế (INR)',
      'Nồng độ Creatinine huyết thanh',
      'Men gan AST/ALT'
    ],
    correctAnswer: 1,
    explanation: 'Warfarin là thuốc chống đông máu có khoảng điều trị hẹp. Chỉ số INR (International Normalized Ratio) cần được theo dõi sát sao để đảm bảo hiệu quả phòng ngừa huyết khối mà không gây nguy cơ xuất huyết.'
  },
  {
    id: 'q4',
    question: 'Cơ chế tác dụng chính của thuốc lợi tiểu quai Furosemide tại thận là gì?',
    category: 'Dược Lý Thận & Lợi Tiểu',
    options: [
      'Ức chế enzym Carbonic Anhydrase ở ống lượn gần',
      'Ức chế hệ đồng vận chuyển Na+/K+/2Cl- ở nhánh lên quai Henle',
      'Chẹn thụ thể Aldosterone ở ống góp',
      'Ức chế tái hấp thu Glucose ở ống lượn gần'
    ],
    correctAnswer: 1,
    explanation: 'Furosemide gắn và ức chế protein đồng vận chuyển Na+/K+/2Cl- tại nhánh lên dày của quai Henle, làm giảm tái hấp thu natri và muối, gây ra tác dụng lợi tiểu mạnh.'
  },
  {
    id: 'q5',
    question: 'Tác dụng phụ phổ biến và đáng chú ý khi bệnh nhân sử dụng Metformin là gì?',
    category: 'Dược Lý Nội Tiết',
    options: [
      'Tăng cân nhanh chóng và phù toàn thân',
      'Rối loạn tiêu hóa (đầy hơi, tiêu chảy) và nguy cơ nhiễm toan lactic',
      'Tăng nhãn áp và đục thủy tinh thể',
      'Mất ngủ kéo dài'
    ],
    correctAnswer: 1,
    explanation: 'Metformin thường gây rối loạn tiêu hóa nhẹ khi mới bắt đầu điều trị. Tác dụng phụ nghiêm trọng nhưng hiếm gặp là nhiễm toan lactic, đặc biệt trên bệnh nhân suy thận.'
  }
];
