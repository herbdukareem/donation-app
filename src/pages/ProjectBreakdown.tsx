import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const projectData = [
  {
    priority: "PRIORITY 1: Transcript and Innovation Hubs to Mark 50th Anniversary",
    projects: [
      {
        sNo: 1,
        name: "Transcript Hub",
        budget: "₦1.5b",
        justification: "To ensure ONE-STOP transcript systems that are constantly responsive to emerging trends and timely delivery."
      },
      {
        sNo: 2,
        name: "Innovation Hub",
        budget: "₦4.0b",
        justification: "To develop an iconic project as a mark of the 50th anniversary, which responds to the following objectives of innovation, and to make our products become industry leaders."
      }
    ]
  },
  {
    priority: "PRIORITY 2: Improvement in Learning Environment and Welfare",
    projects: [
      {
        sNo: 3,
        name: "Solar Farm",
        budget: "₦5.0b",
        justification: "To be self-sufficient in Energy generation and contribute to the national grid. (The current recurrent bill on power is N2.832 billion)"
      },
      {
        sNo: 4,
        name: "Expansion of water supply",
        budget: "₦2.0b",
        justification: "Upgrade the water supply system to meet the increasing population and water demand on the campuses."
      },
      {
        sNo: 5,
        name: "Upgrade the teaching and learning infrastructure and expand the internet capacity across 16 faculties and multiple campuses",
        budget: "₦10.0b",
        justification: "Upgrade, renovate, and equip learning facilities in each faculty and expand internet infrastructure across our multiple sites. This includes laying fiber-optic cable, upgrading the Network Operations Center (NOC), and installing electronic boards."
      },
      {
        sNo: 6,
        name: "Improvement in transport systems",
        budget: "₦3.0b",
        justification: "Asphalt laying of roads, establishing bus stops with seating facilities, procuring six buses for operations, and setting up relevant electronic systems, such as ticketing mechanisms. To commence the preliminary layout for a campus TRAMP (rail) system."
      }
    ]
  },
  {
    priority: "PRIORITY 3: Excellence in Research and National Development",
    projects: [
      {
        sNo: 7,
        name: "Upgrade of Laboratories",
        budget: "₦16.0b",
        justification: "Upgrade of Laboratories and other relevant facilities for each faculty to ensure they are globally competitive."
      },
      {
        sNo: 8,
        name: "Construct a stem cell, biotechnology, and nanotechnology laboratory complex",
        budget: "₦5.0b",
        justification: "These are specialized laboratories for advanced biomedical research to support tissue regeneration in humans, animals and plants, and to explore the role of biotechnology in improving the quality of life. These capabilities have the potential to make Unilorin a strong leader in state-of-the-art research. Already, a significant amount of funds has been invested in training some staff, but without the necessary infrastructure to implement the training."
      }
    ]
  },
  {
    priority: "Cross Cutting",
    projects: [
      {
        sNo: 9,
        name: "Operational cost",
        budget: "₦3.5b",
        justification: "To procure relevant supportive services, conduct training, hire personnel with specialized skills, ensure servicing, and nurture projects until their viability to be independently sustainable"
      }
    ]
  }
];

const ProjectBreakdown = () => {
  const totalBudget = "₦50.0b";

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-24">
      <section className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/069103c6-68f8-4425-912d-32a7bedc9a21.png" 
            alt="UNILORIN @ 50" 
            className="h-24 md:h-32"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Project Breakdown
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          BREAKDOWN OF THE PRIORITY PROJECTS FOR THE N50 BILLION ENDOWMENT FUND
        </p>
        <p className="text-2xl font-semibold text-primary">
          Total Budget: {totalBudget}
        </p>
      </section>

      <div className="space-y-8">
        {projectData.map((section, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="bg-primary text-primary-foreground p-4">
              <h2 className="text-xl font-bold">{section.priority}</h2>
            </div>
            <div className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">S/No</TableHead>
                    <TableHead className="min-w-[200px]">Priorities</TableHead>
                    <TableHead className="w-32">Budget N(billion)</TableHead>
                    <TableHead>Justifications</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {section.projects.map((project) => (
                    <TableRow key={project.sNo}>
                      <TableCell className="font-medium text-center">
                        {project.sNo}
                      </TableCell>
                      <TableCell className="font-medium">
                        {project.name}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {project.budget}
                      </TableCell>
                      <TableCell className="text-sm leading-relaxed">
                        {project.justification}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="inline-block p-6 bg-accent">
          <p className="text-lg font-semibold">
            Total Project Budget: <span className="text-2xl text-primary">{totalBudget}</span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ProjectBreakdown;
