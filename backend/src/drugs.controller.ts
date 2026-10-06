import { Controller, Get, Param, Post, Body } from '@nestjs/common';

const MOCK_DRUGS_BACKEND = [
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
      }
    ]
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
      }
    ]
  },
  {
    id: 'warfarin',
    name: 'Warfarin',
    brandNames: ['Coumadin', 'Jantoven'],
    category: 'Anticoagulants',
    description: 'Warfarin là thuốc chống đông máu nhóm kháng Vitamin K, phòng ngừa và điều trị huyết khối tĩnh mạch, tắc mạch phổi.',
    mechanism: 'Ức chế enzym Vitamin K epoxide reductase (VKORC1).',
    dosage: '2 mg - 5 mg hàng ngày.',
    sideEffects: ['Chảy máu bất thường', 'Bầm tím'],
    interactions: []
  }
];

@Controller('api/drugs')
export class DrugsController {
  @Get()
  getAllDrugs() {
    return MOCK_DRUGS_BACKEND;
  }

  @Get(':id')
  getDrugById(@Param('id') id: string) {
    const drug = MOCK_DRUGS_BACKEND.find((d) => d.id.toLowerCase() === id.toLowerCase());
    if (!drug) return { error: 'Drug not found' };
    return drug;
  }

  @Post('polypharmacy')
  analyzePolypharmacy(@Body('drugIds') drugIds: string[]) {
    if (!drugIds || !Array.isArray(drugIds)) return { nodes: [], links: [] };

    const selected = MOCK_DRUGS_BACKEND.filter((d) => drugIds.includes(d.id));
    const nodes = selected.map((d) => ({ id: d.id, name: d.name, category: d.category }));
    const links: any[] = [];

    const set = new Set(selected.map((d) => d.id));
    selected.forEach((drug) => {
      drug.interactions.forEach((inter) => {
        if (set.has(inter.targetDrugId)) {
          links.push({
            source: drug.id,
            target: inter.targetDrugId,
            severity: inter.severity,
            description: inter.description,
          });
        }
      });
    });

    return { nodes, links };
  }
}
