import { Database, FileText } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Algorithm, Cite, DocFigure, DocImage, DocSection, DocSubsection, DocTable, Remark, XRef } from '../../components/document/Doc';
import { Equation, M } from '../../components/document/Math';
import ResourceHero from '../../components/resource-detail/ResourceHero';
import SidebarCard from '../../components/resource-detail/SidebarCard';
import SidebarLinks from '../../components/resource-detail/SidebarLinks';
import TableOfContents from '../../components/resource-detail/TableOfContents';
import { useRegisterSectionNav } from '../../context/SectionNavContext';
import results from '../../data/lotusimExplorationResults.json';
import resourcesData from '../../data/resources.json';
import { getProject, getProjectResources } from '../../lib/projects';
import type { Resource } from '../../types/resource';
import overviewImg from '../../assets/resources/lotusim-cooperative-exploration/training-deployment.svg';
import baselinesImg from '../../assets/resources/lotusim-cooperative-exploration/baselines.svg';
import coverageImg from '../../assets/resources/lotusim-cooperative-exploration/coverage.svg';
import snapshotImg from '../../assets/resources/lotusim-cooperative-exploration/decision-snapshot.svg';
import observationImg from '../../assets/resources/lotusim-cooperative-exploration/observation-channels.svg';
import scoreGeometryImg from '../../assets/resources/lotusim-cooperative-exploration/score-geometry.svg';
import sequenceImg from '../../assets/resources/lotusim-cooperative-exploration/deployment-sequence.svg';
import validationImg from '../../assets/resources/lotusim-cooperative-exploration/validation.svg';
import lotusimTrialsImg from '../../assets/resources/lotusim-cooperative-exploration/lotusim-trials.svg';
import lotusimTopFinalImg from '../../assets/resources/lotusim-cooperative-exploration/lotusim-top-final.svg';
import lotusimTopNearestImg from '../../assets/resources/lotusim-cooperative-exploration/lotusim-top-nearest.svg';
import lotusimTopTeamImg from '../../assets/resources/lotusim-cooperative-exploration/lotusim-top-team-size.svg';

const tex = String.raw;
const resource = (resourcesData as Resource[]).find((entry) => entry.slug === 'lotusim-cooperative-exploration')!;
const project = getProject(resource.project);
const DOWNLOADS = '/resources/lotusim-cooperative-exploration';
const LINKS = [
  { href: `${DOWNLOADS}/report.pdf`, label: 'Extended report (PDF)', icon: FileText },
  { href: `${DOWNLOADS}/evidence.json`, label: 'Benchmark data (JSON)', icon: Database },
];

const REPLAYS = [3, 4, 5].map((uavs) => ({
  uavs,
  src: `${DOWNLOADS}/replays/replay-${uavs}-uavs.mp4`,
  poster: `${DOWNLOADS}/replays/replay-${uavs}-uavs.jpg`,
}));

const NAV_ITEMS = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'introduction', label: '1 Introduction' },
  { id: 'related-work', label: '2 Related work' },
  { id: 'method', label: '3 Method' },
  { id: 'experiments', label: '4 Experiments' },
  { id: 'deployment', label: '5 Results in LOTUSim' },
  { id: 'future-work', label: '6 Future work in LOTUSim' },
  { id: 'limitations', label: '7 Limitations' },
  { id: 'conclusion', label: '8 Conclusion' },
  { id: 'references', label: 'References' },
];

const MAPPO_ALGORITHM = [
  'initialise the shared actor π_θ (Beta policy) and the centralised critic V_φ',
  'for update = 1 … 300:',
  '    run 8 environments for 64 decisions each:',
  '        every UAV samples λ_i ~ π_θ(· | o_i)',
  '        each UAV scores its frontier candidates with λ_i and plans an A* route',
  '        all UAVs fly and scan for 5 s; the maps are fused; rewards are computed',
  '    compute per-agent advantages and returns with GAE (γ = 0.99, λ_GAE = 0.95)',
  '    repeat 4 epochs × 4 minibatches:',
  '        actor:  minimise the clipped PPO loss minus 0.01 × entropy',
  '        critic: minimise the squared error to the returns',
  '    every 25 updates: run the actor (mean weight) on 20 validation maps; keep the best',
];

const REFERENCES: { id: number; content: ReactNode }[] = [
  {
    id: 1,
    content: (
      <>
        P. Song and H. Yang, “FA-MARL: Frontier assignment with multi-agent reinforcement learning for efficient decentralized
        multi-robot exploration,” in <em>Proc. 20th IEEE International Conference on Control and Automation (ICCA)</em>, 2026,
        p. 1722.{' '}
        <a href="https://doi.org/10.1109/ICCA69928.2026.11618240" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          doi:10.1109/ICCA69928.2026.11618240
        </a>
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        C. Yu, A. Velu, E. Vinitsky, J. Gao, Y. Wang, A. Bayen and Y. Wu, “The surprising effectiveness of PPO in cooperative
        multi-agent games,”{' '}
        <a href="https://arxiv.org/abs/2103.01955" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:2103.01955
        </a>
        , 2021.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        C. Buche, J. Grosset, H. Lechêne, M. Dubromel, P. Havez-Bodivit, M. Neo and J. Prodhon, “
        <Link to="/resources/lotusim-iros2026" className="text-accent hover:underline">
          LOTUSim: Multi-domain simulator for marine robotics
        </Link>
        ,” in <em>Proc. IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)</em>, 2026.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        B. Yamauchi, “A frontier-based approach for autonomous exploration,” in{' '}
        <em>Proc. IEEE International Symposium on Computational Intelligence in Robotics and Automation (CIRA)</em>, 1997,
        pp. 146–151.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        B. Zhou, Y. Zhang, X. Chen and S. Shen, “FUEL: Fast UAV exploration using incremental frontier structure and hierarchical
        planning,” <em>IEEE Robotics and Automation Letters</em>, vol. 6, no. 2, pp. 779–786, 2021.{' '}
        <a href="https://doi.org/10.1109/LRA.2021.3051563" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          doi:10.1109/LRA.2021.3051563
        </a>
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        X. Yan, M. Zhang, Y. Fang, Y. Sun, J. Ma, Y. Gong, B. Zhou and J. Mei, “C²-Explorer: Contiguity-driven task allocation
        with connectivity-aware task representation for decentralized multi-UAV exploration,”{' '}
        <a href="https://arxiv.org/abs/2603.07699" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:2603.07699
        </a>
        , 2026.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        B. Zhou, H. Xu and S. Shen, “RACER: Rapid collaborative exploration with a decentralized multi-UAV system,”{' '}
        <a href="https://arxiv.org/abs/2209.08533" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:2209.08533
        </a>
        , 2022.
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        J. Schulman, F. Wolski, P. Dhariwal, A. Radford and O. Klimov, “Proximal policy optimization algorithms,”{' '}
        <a href="https://arxiv.org/abs/1707.06347" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:1707.06347
        </a>
        , 2017.
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        J. Schulman, P. Moritz, S. Levine, M. Jordan and P. Abbeel, “High-dimensional continuous control using generalized
        advantage estimation,” in <em>Proc. International Conference on Learning Representations (ICLR)</em>, 2016.{' '}
        <a href="https://arxiv.org/abs/1506.02438" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:1506.02438
        </a>
      </>
    ),
  },
  {
    id: 10,
    content: (
      <>
        P.-W. Chou, D. Maturana and S. Scherer, “Improving stochastic policy gradients in continuous control with deep
        reinforcement learning using the Beta distribution,” in <em>Proc. International Conference on Machine Learning (ICML)</em>,
        2017, pp. 834–843.
      </>
    ),
  },
  {
    id: 11,
    content: (
      <>
        P. Cieślak, “Stonefish: An advanced open-source simulation tool designed for marine robotics, with a ROS
        interface,” in <em>Proc. OCEANS 2019 – Marseille</em>, 2019.
      </>
    ),
  },
  {
    id: 12,
    content: (
      <>
        E. Potokar, S. Ashford, M. Kaess and J. G. Mangelson, “HoloOcean: An underwater robotics simulator,” in{' '}
        <em>Proc. IEEE International Conference on Robotics and Automation (ICRA)</em>, 2022.
      </>
    ),
  },
  {
    id: 13,
    content: (
      <>
        S. Chu, Z. Huang, Y. Li, M. Lin, I. Carlucho, Y. R. Petillot and C. Yang, “MarineGym: A high-performance
        reinforcement learning platform for underwater robotics,”{' '}
        <a href="https://arxiv.org/abs/2503.09203" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:2503.09203
        </a>
        , 2025.
      </>
    ),
  },
  {
    id: 14,
    content: (
      <>
        B. Xu, F. Gao, C. Yu, R. Zhang, Y. Wu and Y. Wang, “OmniDrones: An efficient and flexible platform for
        reinforcement learning in drone control,”{' '}
        <a href="https://arxiv.org/abs/2309.12825" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:2309.12825
        </a>
        , 2023.
      </>
    ),
  },
  {
    id: 15,
    content: (
      <>
        M. Kulkarni, W. Rehberg and K. Alexis, “Aerial Gym Simulator: A framework for highly parallelized simulation of
        aerial robots,”{' '}
        <a href="https://arxiv.org/abs/2503.01471" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:2503.01471
        </a>
        , 2025.
      </>
    ),
  },
  {
    id: 16,
    content: (
      <>
        J. Panerati, H. Zheng, S. Zhou, J. Xu, A. Prorok and A. P. Schoellig, “Learning to fly — a gym environment with
        PyBullet physics for reinforcement learning of multi-agent quadcopter control,” in{' '}
        <em>Proc. IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)</em>, 2021.
      </>
    ),
  },
  {
    id: 17,
    content: (
      <>
        Y. Song, S. Naji, E. Kaufmann, A. Loquercio and D. Scaramuzza, “Flightmare: A flexible quadrotor simulator,” in{' '}
        <em>Proc. Conference on Robot Learning (CoRL)</em>, 2020.
      </>
    ),
  },
  {
    id: 18,
    content: (
      <>
        S. Shah, D. Dey, C. Lovett and A. Kapoor, “AirSim: High-fidelity visual and physical simulation for autonomous
        vehicles,” in <em>Field and Service Robotics (FSR)</em>, 2017.
      </>
    ),
  },
  {
    id: 19,
    content: (
      <>
        D. S. Chaplot, D. Gandhi, A. Gupta and R. Salakhutdinov, “Object goal navigation using goal-oriented semantic
        exploration,” in <em>Advances in Neural Information Processing Systems (NeurIPS)</em>, 2020.{' '}
        <a href="https://arxiv.org/abs/2007.00643" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:2007.00643
        </a>
      </>
    ),
  },
  {
    id: 20,
    content: (
      <>
        O. Bagoren, S. Isaacson, S. Sundar, Y.-C. Sun, A. Sheppard, H. Ma, A. Shariff, R. Vasudevan and K. A. Skinner,
        “SurfSLAM: Sim-to-real underwater stereo reconstruction for real-time SLAM,”{' '}
        <a href="https://arxiv.org/abs/2601.10814" target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
          arXiv:2601.10814
        </a>
        , 2026.
      </>
    ),
  },
];

function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

function Term({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

export default function LotusimCooperativeExploration() {
  useRegisterSectionNav(NAV_ITEMS);
  const run = results.runs.find((entry) => entry.id === '3d_fixed_013')!;
  const learned = run.summaries.mappo;
  const num = (value: number, digits = 1) =>
    value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start lg:gap-14">
        <article className="min-w-0 max-w-3xl">
          <ResourceHero
            eyebrow="Technical report · Methodology"
            title={resource.title}
            subtitle="Three UAVs learn, with multi-agent reinforcement learning, how to trade travel distance against new information when choosing where to explore next — trained in a lightweight 3D simulator and run inside LOTUSim."
            authors={resource.authors}
            affiliations={resource.affiliations ?? []}
            projectSlug={project.slug}
            projectName={project.name}
            resourceCount={getProjectResources(resource.project).length}
            extraLinks={LINKS}
          />

          <div className="-mt-6 text-[1rem] leading-[1.75] text-foreground/85">
            <section id="abstract" className="scroll-mt-28 pt-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">Abstract</h2>
              <div className="mt-4 space-y-4">
                <P>
                  A team of UAVs exploring an unknown space has to keep deciding where each vehicle should go next. Classical
                  frontier methods make that choice with a fixed rule, such as “go to the nearest unexplored edge”, which is cheap
                  but leads to redundant, inefficient exploration. FA-MARL <Cite refs={[1]} /> keeps the classical frontier pipeline and
                  learns only one number per robot: a weight <M>{tex`\lambda`}</M> that balances travel distance against expected
                  information gain. This report adapts FA-MARL from 2D ground robots to 3D multi-UAV exploration, trains the
                  shared policy with MAPPO <Cite refs={[2]} /> and runs it in the LOTUSim simulator <Cite refs={[3]} /> with Unity
                  ray sensing and PX4 flight control.
                </P>
                <P>
                  In a lightweight 3D simulator, the final model maps 95% of the reachable free space in {num(learned.mean_t95_s)}{' '}
                  simulated seconds on average over 40 unseen maps. On 20 of them it takes 175 s, against 585 s for nearest-frontier
                  and 583 s for Voronoi assignment, finishes first on every map and flies about 60% less. Run unchanged in LOTUSim
                  over 10 missions of a minefield scenario, it takes 203 s against 430 s and 436 s for the two baselines, and it
                  also works with four and five UAVs without retraining. All results come from simulation with one trained policy.
                </P>
              </div>
              <p className="mt-5 text-sm text-muted">
                <span className="font-semibold text-foreground">Keywords:</span> {resource.tags.join('; ')}
              </p>
            </section>

            {/* ------------------------------------------------------------------ 1 */}
            <DocSection id="introduction" number="1" title="Introduction">
              <P>
                Mapping an unknown area is a first step in search and rescue, inspection and survey missions. Several UAVs can
                cover it faster than one, but only if they spread out: when two vehicles chase the same unexplored region, the
                team spends flight time without learning anything new. The core question at every moment is therefore{' '}
                <em>which unexplored place should each UAV fly to next?</em>
              </P>
              <P>
                The classical answer is frontier-based exploration <Cite refs={[4]} />. A <Term>frontier</Term> is a known-free
                cell next to unknown space; flying there is guaranteed to reveal something. Simple rules then pick a frontier:
                nearest-frontier sends each robot to the closest one, which is cheap but often reveals little and lets teammates
                crowd the same region; Voronoi assignment splits the map so that each robot only takes frontiers closest to it,
                which avoids crowding but still ignores how much each frontier would reveal. Learning a policy end-to-end, on the
                other hand, replaces the whole pipeline with a network that is hard to interpret and hard to deploy.
              </P>
              <P>
                FA-MARL <Cite refs={[1]} /> sits between the two. It keeps mapping, frontier detection and path planning as they
                are, and lets a learned policy set one continuous weight <M>{tex`\lambda_i\in[0,1]`}</M> per robot. The weight
                decides how the robot scores frontiers: near <M>1</M> it prefers short trips, near <M>0</M> it prefers frontiers
                that reveal a lot of unknown space. The action is one number, so the policy stays small, and every decision can be
                explained by the score it produced.
              </P>
              <P>The original method was demonstrated with 2D ground robots. This work makes three contributions:</P>
              <ul className="list-disc space-y-2 pl-5 marker:text-muted">
                <li>
                  <Term>3D adaptation.</Term> FA-MARL is rebuilt for UAVs: a 3D voxel map, a spherical LiDAR, 3D frontiers,
                  information gain and frontier clustering, and a 3D convolutional policy.
                </li>
                <li>
                  <Term>Training environment and protocol.</Term> A fast, deterministic 3D exploration simulator in which a shared
                  policy is trained with MAPPO, validated during training and tested on unseen maps against nearest-frontier and
                  Voronoi baselines.
                </li>
                <li>
                  <Term>Integration in LOTUSim.</Term> The trained policy runs unchanged inside LOTUSim, with Unity raycast
                  sensing and PX4 software-in-the-loop multirotors (<XRef href="#fig-1">Figure 1</XRef>), and is compared with the same
                  baselines over repeated LOTUSim missions.
                </li>
              </ul>
              <DocFigure
                id="fig-1"
                number={1}
                caption="System overview. Top, training: in the voxel simulator, the shared actor reads each UAV's observation and samples a weight λ; frontier selection and 3D A* turn it into a route, the UAVs move and sense, and the rewards fill a rollout buffer for the MAPPO update. Middle: the shared actor (six 3D input channels, three 3D convolutions, a dense layer and two Beta heads) and the centralised critic, used only in training. Bottom, deployment: the checkpoint chosen by validation runs unchanged in LOTUSim, where Unity raycasts build the voxel maps, the actor's mean weight scores safe viewpoints, and PX4 flies the planned route. Click to enlarge."
              >
                <DocImage
                  src={overviewImg}
                  width={1310}
                  height={590}
                  alt="Three-part diagram. Training pipeline: voxel environment, observation, shared actor sampling a Beta-distributed weight, frontier selection with 3D A-star, move and sense, reward, rollout buffer and MAPPO update. Network detail: six-channel observation through three 3D convolutions, a 256-unit layer and Beta heads; a centralised critic over all three observations. Deployment in LOTUSim: Unity raycasts, voxel map fusion, actor with fixed weights, safe-viewpoint selection with 3D A-star, PX4 offboard control and UAV motion, looping back to sensing."
                />
              </DocFigure>
            </DocSection>

            {/* ------------------------------------------------------------------ 2 */}
            <DocSection id="related-work" number="2" title="Related work">
              <P>
                <Term>Frontier exploration.</Term> Since Yamauchi <Cite refs={[4]} />, exploration systems have sent robots to
                frontiers and scored them by distance, information gain or both. For UAVs, FUEL <Cite refs={[5]} /> groups
                frontier voxels into clusters and plans a tour through them; this work borrows only its clustering idea, to reduce
                thousands of frontier voxels to a few hundred candidates.
              </P>
              <P>
                <Term>Multi-UAV coordination.</Term> C²-Explorer <Cite refs={[6]} /> allocates connected unexplored regions as
                tasks so that UAVs avoid detours between regions, and RACER <Cite refs={[7]} /> balances workload between UAVs
                with decentralised planning under limited communication. Both coordinate explicitly; here coordination comes
                only from a shared map and each UAV's learned weight.
              </P>
              <P>
                <Term>Multi-agent reinforcement learning.</Term> MAPPO <Cite refs={[2]} /> applies proximal policy optimisation{' '}
                <Cite refs={[8]} /> to cooperative teams under centralised training with decentralised execution (CTDE): during
                training a critic sees the whole team, while at run time each agent acts from its own observation. FA-MARL{' '}
                <Cite refs={[1]} /> uses MAPPO with a continuous frontier weight as the action, which this work adopts.
              </P>
              <P>
                <Term>Reinforcement learning in robot simulators.</Term> Most simulators used for reinforcement learning in
                marine and aerial robotics train <em>low-level</em> skills: holding a position, tracking a trajectory or avoiding
                an obstacle (<XRef href="#tab-1">Table 1</XRef>). This work trains a <em>mission-level</em> decision — where each
                UAV of a team should explore next — and runs it on top of the full vehicle stack that LOTUSim provides.
              </P>
              <DocTable
                id="tab-1"
                number={1}
                caption="Examples of what reinforcement learning is used for in marine and aerial robot simulators."
                head={['Simulator', 'Domain', 'Example tasks learned with RL', 'Level']}
                rows={[
                  [<>Stonefish <Cite refs={[11]} /></>, 'Marine', 'AUV docking, manipulator reaching', 'Low-level control'],
                  [<>HoloOcean <Cite refs={[12]} /></>, 'Underwater', 'ROV inspection from camera and sonar; obstacle avoidance by steering', 'Control and local navigation'],
                  [<>MarineGym <Cite refs={[13]} /></>, 'Underwater', 'Station keeping, trajectory tracking', 'Low-level control'],
                  [<>OmniDrones <Cite refs={[14]} /></>, 'Aerial', 'Hover, trajectory tracking, flying through gaps, formation, cooperative payload carrying', 'Low-level control'],
                  [<>Aerial Gym <Cite refs={[15]} /></>, 'Aerial', 'Position control, depth-camera navigation through obstacles', 'Control and navigation'],
                  [<>gym-pybullet-drones <Cite refs={[16]} /></>, 'Aerial', 'Hover, fly-through, leader–follower', 'Low-level control'],
                  [<>Flightmare <Cite refs={[17]} /></>, 'Aerial', 'Quadrotor control, vision-based flight', 'Control'],
                  [<>AirSim <Cite refs={[18]} /></>, 'Aerial', 'Camera-based obstacle avoidance', 'Navigation'],
                  [<strong key="this">This work (LOTUSim)</strong>, 'Aerial, maritime scene', 'Cooperative exploration: where each UAV goes next', <strong key="lvl">Mission-level decisions</strong>],
                ]}
              />
            </DocSection>

            {/* ------------------------------------------------------------------ 3 */}
            <DocSection id="method" number="3" title="Method">
              <DocSubsection number="3.1" title="Overview">
                <P>
                  Every 5 seconds, each UAV goes through the same loop (top row of <XRef href="#fig-1">Figure 1</XRef>):
                </P>
                <ol className="list-decimal space-y-1.5 pl-5 marker:text-muted">
                  <li>
                    <Term>Sense.</Term> Its LiDAR scan marks voxels as free or occupied in its own 3D map.
                  </li>
                  <li>
                    <Term>Share.</Term> All UAV maps are merged into one team map.
                  </li>
                  <li>
                    <Term>Find candidates.</Term> Frontiers are extracted from the team map and grouped into clusters.
                  </li>
                  <li>
                    <Term>Decide.</Term> The policy reads the UAV's maps and positions and outputs its weight{' '}
                    <M>{tex`\lambda_i`}</M>.
                  </li>
                  <li>
                    <Term>Score and plan.</Term> Each candidate is scored with <M>{tex`\lambda_i`}</M>; the best one becomes the
                    target, and A* plans a collision-free route to it.
                  </li>
                  <li>
                    <Term>Fly.</Term> The UAV follows the route while scanning, until the next decision.
                  </li>
                </ol>
                <P>
                  Only step 4 is learned. The rest is a classical, deterministic pipeline, so the same policy can be compared
                  directly with classical rules that share steps 1–3, 5 and 6.
                </P>
              </DocSubsection>

              <DocSubsection number="3.2" title="Problem formulation">
                <P>
                  Following FA-MARL, the task is a partially observable multi-agent decision problem with <M>N=3</M> UAVs: each UAV{' '}
                  <M>i</M> receives an observation <M>{tex`o_i`}</M>, chooses an action <M>{tex`\lambda_i`}</M>, and receives a
                  reward <M>{tex`r_i`}</M>. The space is a <M>{tex`125\times125\times24`}</M> m box divided into 1 m voxels. Success
                  is measured on <M>{tex`\mathcal{R}`}</M>, the free voxels the UAVs can actually reach from where they start.
                  Coverage at time <M>t</M> and the completion time are
                </P>
                <Equation number={1} tex={tex`\operatorname{cov}(t)=\frac{\left|\{\,v\in\mathcal{R}:M_t(v)=\text{free}\,\}\right|}{|\mathcal{R}|},\qquad T_{95}=\min\{\,t:\operatorname{cov}(t)\ge 0.95\,\},`} />
                <P>
                  where <M>{tex`M_t`}</M> is the team map. <M>{tex`T_{95}`}</M>, the time to map 95% of the reachable free space,
                  is the main evaluation metric. Ground truth is used only to simulate the sensor and to score coverage; the policy
                  and planner never see it.
                </P>
              </DocSubsection>

              <DocSubsection number="3.3" title="Mapping, frontiers and information gain">
                <P>
                  <Term>Mapping.</Term> Each UAV carries a 360° LiDAR with 20 m range: 360 azimuths × 15 elevation rings plus the
                  two poles, 5,402 rays per scan at 2 Hz. Each ray marks the voxels it passes through as free and the voxel it hits
                  as occupied. Every UAV keeps its own map, and the team map combines them; if two maps disagree, “occupied” wins,
                  which is the safe choice for planning.
                </P>
                <P>
                  <Term>Frontiers.</Term> A frontier voxel is a known-free voxel with at least one unknown face-neighbour:
                </P>
                <Equation
                  number={2}
                  tex={tex`\mathcal{F}=\{\,v: M(v)=\text{free}\ \wedge\ \exists\,u\in\mathcal{N}_6(v): M(u)=\text{unknown}\,\}.`}
                />
                <P>
                  <Term>Information gain.</Term> The gain of a candidate <M>k</M> estimates how much it could reveal: the fraction
                  of unknown voxels within a sphere of radius <M>r=20</M> m (the LiDAR range) around it,
                </P>
                <Equation
                  number={3}
                  tex={tex`g_k=\frac{\left|\{\,u\in W(k): M(u)=\text{unknown}\,\}\right|}{|W(k)|}\in[0,1].`}
                />
                <P>
                  <Term>Clustering.</Term> A 3D map produces many thousands of adjacent frontier voxels that are practically the
                  same target. Following FUEL <Cite refs={[5]} />, neighbouring frontier voxels are grouped into clusters no wider
                  than 10 m, and each cluster offers three candidates: the voxel nearest the UAV, the one with the highest gain,
                  and the most central one. In the decision shown in Section 3.5, this reduces 16,742 frontier voxels to 510
                  candidates.
                </P>
              </DocSubsection>

              <DocSubsection number="3.4" title="Observation">
                <P>
                  Each UAV observes six 3D channels of size <M>{tex`24\times125\times125`}</M>, covering the whole space at 1 m
                  resolution (<XRef href="#fig-2">Figure 2</XRef>). They describe what this UAV knows (its own map, position and
                  recent path), where the team is (teammate positions), and what the team knows (the shared map and its
                  frontiers). The recent path fades with a 30 s time constant, so the policy can tell where the UAV has just been.
                  The policy is not given the candidate list or their gains: it has to learn from the maps how its weight will
                  play out.
                </P>
                <DocFigure
                  id="fig-2"
                  number={2}
                  caption="The six input channels of UAV 1 at the decision of Figure 3 (t = 40 s), each a top-down view of the whole 125 m × 125 m area. Panels 0, 4 and 5 show the layer at the UAV's height (11.5 m); panels 1–3 combine all heights. The UAV's own map (0) holds only what its own sensor has seen; the team's shared map (4) adds what its teammates have seen."
                >
                  <DocImage
                    src={observationImg}
                    width={746}
                    height={526}
                    alt="Six top-down panels of one UAV's input: its own map, its position, its recent path, its teammates' positions, the team's shared map and the frontier cells."
                  />
                </DocFigure>
              </DocSubsection>

              <DocSubsection number="3.5" title="Action: one weight per UAV">
                <P>
                  The policy outputs one number per UAV, <M>{tex`\lambda_i\in(0,1)`}</M>. The UAV then scores every candidate{' '}
                  <M>k</M> and picks the lowest score:
                </P>
                <Equation
                  number={4}
                  tex={tex`\Omega_{ik}=\lambda_i\,\frac{d_{ik}}{D}-(1-\lambda_i)\,g_k,\qquad k^\star=\arg\min_k\Omega_{ik},`}
                />
                <P>
                  where <M>{tex`d_{ik}`}</M> is the straight-line distance from UAV <M>i</M> to candidate <M>k</M> and{' '}
                  <M>{tex`D\approx178`}</M> m is the diagonal of the space, so that both terms lie between 0 and 1. A high weight
                  penalises distance (at <M>{tex`\lambda=1`}</M> the rule is exactly nearest-frontier); a low weight rewards gain.
                  The policy can therefore choose, at each decision, between finishing nearby work and heading for open, unexplored
                  space. A* then plans a route to the chosen target through known-free voxels.
                </P>
                <P>
                  <XRef href="#tab-2">Table 2</XRef> shows the effect with three made-up candidates: A is near but reveals little,
                  C is far but reveals a lot, and B is in between. The same three candidates give three different targets
                  depending on the weight. This is also how the action differs from a typical learned navigation policy, which
                  outputs a move (up, down, left or right): here the policy never steers the UAV, it only decides how frontiers are
                  ranked.
                </P>
                <DocTable
                  id="tab-2"
                  number={2}
                  caption="How the weight changes the choice, for three illustrative candidates with normalised distance d/D and gain g. Lower scores win; the chosen candidate is in bold."
                  head={['Candidate', 'd / D', 'g', <>λ = 1 (distance first)</>, <>λ = 0.5 (balanced)</>, <>λ = 0 (gain first)</>]}
                  align={['left', 'right', 'right', 'right', 'right', 'right']}
                  rows={[
                    ['A — near, little to see', '0.20', '0.10', <strong key="a1">0.20</strong>, '0.05', '−0.10'],
                    ['B — in between', '0.50', '0.60', '0.50', <strong key="b5">−0.05</strong>, '−0.60'],
                    ['C — far, a lot to see', '0.90', '0.90', '0.90', '0.00', <strong key="c0">−0.90</strong>],
                  ]}
                />
                <P>
                  <XRef href="#fig-3">Figure 3</XRef> shows one real decision of the final model on an unseen test map: the three
                  UAVs choose targets about 20 m away in three different unexplored regions.{' '}
                  <XRef href="#fig-4">Figure 4</XRef> shows how UAV 1's target was selected. Only the candidates on the dashed
                  boundary can win for some weight; the chosen one is the best balance of a short trip and a high gain, and it
                  stays the choice for any weight from 0.031 to 0.842.
                </P>
                <DocFigure
                  id="fig-3"
                  number={3}
                  caption="One decision of the final model on test map 1,000,000 at t = 40 s, with 43% of the space mapped, seen from above. For each UAV: the path flown so far (dashed), its position (dot), the target it chose (star) and the planned A* route (thick line). A route may cross an obstacle column because the obstacle can lie at another height."
                >
                  <DocImage
                    src={snapshotImg}
                    width={580}
                    height={579}
                    alt="Top-down view of a partially explored 125 by 125 metre map with three UAVs, their flown paths, chosen targets and planned routes toward three different unexplored regions."
                  />
                </DocFigure>
                <DocFigure
                  id="fig-4"
                  number={4}
                  caption="How UAV 1 chose its target in Figure 3. Each dot is one of the 510 candidates, placed by its distance and its estimated gain. The dashed line joins the only candidates that some weight λ can select. With the final model's λ = 0.81, the UAV picks the starred candidate: 20 m away with gain 0.75."
                >
                  <DocImage
                    src={scoreGeometryImg}
                    width={635}
                    height={412}
                    alt="Scatter plot of 510 candidate frontiers by distance in metres and information gain. A dashed boundary joins the supported candidates; the chosen target is 20 metres away with gain 0.75, between a closer candidate with gain 0.39 and a farther one 67 metres away."
                  />
                </DocFigure>
              </DocSubsection>

              <DocSubsection number="3.6" title="Reward design">
                <P>
                  As in FA-MARL, each UAV's reward is the sum of a team term, shared by all UAVs, and an individual term (
                  <XRef href="#tab-3">Table 3</XRef>). The team terms set the main goal — explore quickly and finish — and the
                  individual terms shape each UAV's behaviour: find new space yourself, do not rescan known space, do not overlap
                  with teammates, and do not fly long detours.
                </P>
                <DocTable
                  id="tab-3"
                  number={3}
                  caption="Reward terms of the final model, computed after every 5 s decision step. “New” voxels were unknown to the team at the start of the step; ratios are taken over the voxels scanned in that step."
                  head={['Level', 'Term', 'Weight', 'What it encourages']}
                  align={['left', 'left', 'right', 'left']}
                  rows={[
                    ['Team', 'Success milestones', '+2.0', 'Reaching 85% and 95% coverage (once each)'],
                    ['', 'Exploration', '+10.0', 'New voxels found by the team, as a share of the whole space'],
                    ['', 'Overlap', '−0.05', 'Not rescanning space the team already knew'],
                    ['', 'Time', '−0.2', 'Finishing quickly (a fixed cost per step)'],
                    ['', 'Collision', '−5.0', 'Never hitting an obstacle or a teammate (ends the episode)'],
                    ['Individual', 'Local discovery', '+5.0', 'New voxels found by this UAV'],
                    ['', 'Redundancy', '−0.05', 'This UAV not rescanning known space'],
                    ['', 'Interference', '−0.2', 'Not scanning the same voxels as a teammate'],
                    ['', 'Path length', '−0.05', 'Short flights (per 10 m flown)'],
                    ['', 'Voronoi excess', '−0.1', 'Not choosing a target that a teammate was much closer to'],
                  ]}
                />
              </DocSubsection>

              <DocSubsection number="3.7" title="Network and training">
                <P>
                  <Term>Actor.</Term> All UAVs share one actor network. Three 3D convolution layers (16, 32 and 64 channels, each
                  followed by max-pooling) compress the <M>{tex`6\times24\times125\times125`}</M> observation, a dense layer
                  reduces it to 256 features, and two heads output the parameters <M>{tex`\alpha,\beta>1`}</M> of a Beta
                  distribution, from which the weight is drawn:
                </P>
                <Equation number={5} tex={tex`\lambda_i\sim\operatorname{Beta}(\alpha,\beta).`} />
                <P>
                  A Beta distribution naturally stays inside <M>{tex`[0,1]`}</M> <Cite refs={[10]} />. Training samples from it
                  to explore; validation, testing and deployment use its mean <M>{tex`\alpha/(\alpha+\beta)`}</M>, so a trained
                  UAV always makes the same decision in the same situation.
                </P>
                <P>
                  <Term>Critic.</Term> The critic answers “how good is the team's situation?” rather than “how good is my
                  situation?”. It has the same structure as the actor but sees all three observations at once and predicts one
                  value per UAV. It is used only during training, which is what makes the setup CTDE.
                </P>
                <P>
                  <Term>MAPPO.</Term> Both networks are trained with MAPPO <Cite refs={[2]} /> (Algorithm 1). Advantages{' '}
                  <M>{tex`\hat A`}</M> are computed per UAV with generalised advantage estimation <Cite refs={[9]} />, and the
                  actor minimises the clipped PPO loss <Cite refs={[8]} />
                </P>
                <Equation
                  number={6}
                  tex={tex`\mathcal{L}_\pi=-\mathbb{E}\Big[\min\big(\rho\,\hat A,\ \operatorname{clip}(\rho,1-\epsilon,1+\epsilon)\,\hat A\big)\Big]-c_H\,\mathbb{E}\big[\mathcal{H}(\pi_\theta)\big],\qquad \rho=\frac{\pi_\theta(\lambda\mid o)}{\pi_{\theta_{\text{old}}}(\lambda\mid o)},`}
                />
                <P>
                  with <M>{tex`\epsilon=0.2`}</M> and entropy weight <M>{tex`c_H=0.01`}</M>, while the critic minimises the
                  squared error to the estimated returns. <XRef href="#tab-4">Table 4</XRef> lists the main settings.
                </P>
                <Algorithm id="alg-1" number={1} title="MAPPO training of the final model" lines={MAPPO_ALGORITHM} />
              </DocSubsection>
            </DocSection>

            {/* ------------------------------------------------------------------ 4 */}
            <DocSection id="experiments" number="4" title="Experiments">
              <DocSubsection number="4.1" title="Setup">
                <P>
                  Training and testing use the lightweight simulator, which keeps only what the decision depends on — voxel
                  geometry, ray-traced sensing, mapping, frontiers and route following — and drops physics and rendering so that
                  hundreds of thousands of decisions are affordable. Each map is a <M>{tex`125\times125\times24`}</M> m box with
                  random cube obstacles (1–4 m wide, filling 3% of the volume). Three UAVs start from random nearby positions at
                  15.5 m altitude and fly at 2 m/s. Every map is generated from a seed, and training, validation and test seeds never overlap.
                </P>
                <DocTable
                  id="tab-4"
                  number={4}
                  caption="Training settings of the final model."
                  head={['Setting', 'Value']}
                  rows={[
                    ['Team and decision interval', '3 UAVs; a new decision every 5 s'],
                    ['Data per update', '8 environments × 64 decisions = 512 team steps'],
                    ['Updates; epochs × minibatches', '300; 4 × 4'],
                    ['Learning rate (actor / critic)', <><M>{tex`3\times10^{-4}`}</M> / <M>{tex`10^{-3}`}</M></>],
                    [<>Discount <M>{tex`\gamma`}</M> / GAE <M>{tex`\lambda_{\mathrm{GAE}}`}</M> / clip <M>{tex`\epsilon`}</M></>, '0.99 / 0.95 / 0.2'],
                    ['Validation', '20 maps every 25 updates; the best checkpoint is kept'],
                    ['Training time', 'About 16 h on one GPU workstation'],
                  ]}
                />
                <P>
                  <Term>Baselines.</Term> The final model is compared with two classical rules that use exactly the same mapping,
                  candidates and A* planner: <Term>nearest-frontier</Term>, where every UAV goes to its closest frontier (
                  <M>{tex`\lambda=1`}</M>), and <Term>Voronoi assignment</Term>, where each UAV only takes frontiers that are closer
                  to it than to any teammate.
                </P>
                <P>
                  <Term>Test maps and metrics.</Term> All three methods run on the same 20 unseen maps (set A); the final model also
                  runs on 20 more (set B). We report the time to 95% and 85% coverage (<M>{tex`T_{95}`}</M>,{' '}
                  <M>{tex`T_{85}`}</M>), the total distance flown by the team, and how often two UAVs held the same target.
                </P>
              </DocSubsection>

              <DocSubsection number="4.2" title="Training">
                <P>
                  During training, the actor's mean weight was checked on 20 validation maps every 25 updates (
                  <XRef href="#fig-5">Figure 5</XRef>). At every check the mean completion time, between 188.5 s and 213.2 s, was below a
                  fixed-weight reference on the same maps (225.2 s). The checkpoint at update 150, with a validation mean of 188.5 s, became the final model.
                  Because the same maps chose the checkpoint, this number is optimistic; the test results below use unseen maps.
                </P>
                <DocFigure
                  id="fig-5"
                  number={5}
                  caption="Mean T95 on the 20 validation maps during training. The grey dashed line is a fixed weight λ = 0.5 on the same maps, shown for reference; the circled point is the kept checkpoint."
                >
                  <DocImage
                    src={validationImg}
                    width={822}
                    height={277}
                    alt="Line chart over 300 PPO updates: validation completion time stays below the fixed-weight reference of 225.2 seconds, with a minimum of 188.5 seconds at update 150."
                  />
                </DocFigure>
              </DocSubsection>

              <DocSubsection number="4.3" title="Comparison with classical baselines">
                <DocTable
                  id="tab-5"
                  number={5}
                  caption="Results on the 20 test maps of set A. Every episode reached 95% coverage. SD is the standard deviation across maps."
                  head={['Method', <>Mean <M>{tex`T_{95}`}</M> (SD)</>, <>Mean <M>{tex`T_{85}`}</M></>, 'Distance flown', 'Same-target steps']}
                  align={['left', 'right', 'right', 'right', 'right']}
                  rows={[
                    ['Nearest-frontier', '584.75 s (65.0)', '472.5 s', '2,508 m', '11.6%'],
                    ['Voronoi', '582.75 s (60.9)', '467.0 s', '2,450 m', '0.0%'],
                    [<strong key="final">Final model</strong>, <strong key="t95">175.25 s (39.2)</strong>, <strong key="t85">127.8 s</strong>, <strong key="dist">972 m</strong>, '4.8%'],
                  ]}
                />
                <P>
                  The final model reached 95% coverage <Term>about 3.3 times faster</Term> than either baseline on average (
                  <XRef href="#tab-5">Table 5</XRef>, <XRef href="#fig-6">Figure 6</XRef>), and it was faster on all 20 maps —
                  between 2.2 and 5.4 times faster than nearest-frontier on individual maps. The team also flew about 60% less.{' '}
                  <XRef href="#fig-7">Figure 7</XRef> shows that the gap opens from the first decisions: at 175 s the final model
                  has mapped 94% of the space on average, while the baselines are near 41%.
                </P>
                <P>
                  Voronoi assignment never sent two UAVs to the same target, yet it was no faster than nearest-frontier. Avoiding
                  identical targets is therefore not enough; what matters is choosing targets that reveal a lot of space per metre
                  flown, which is what the learned weight trades off. Note that the comparison is between whole pipelines: the
                  baselines score by distance only, so the gain comes from the gain-aware score and the learned weight together.
                </P>
                <P>
                  On the second set of 20 unseen maps (set B) the final model took 180.75 s on average, close to set A; over all 40
                  maps the mean is {num(learned.mean_t95_s)} s and the slowest map took 300 s.
                </P>
                <DocFigure
                  id="fig-6"
                  number={6}
                  caption="Averages over the 20 maps of set A. Left: time to map 95% of the reachable free space. Right: total distance flown by the team."
                >
                  <DocImage
                    src={baselinesImg}
                    width={729}
                    height={242}
                    alt="Two bar charts. Mean time to map 95 percent: nearest frontier 585 seconds, Voronoi 583 seconds, final model 175 seconds. Mean team flight distance: nearest frontier 2,508 metres, Voronoi 2,450 metres, final model 972 metres."
                  />
                </DocFigure>
                <DocFigure
                  id="fig-7"
                  number={7}
                  caption="Average share of the reachable free space mapped over time on the 20 maps of set A. The dotted lines mark the average T95 of the final model (175 s) and of nearest-frontier (585 s)."
                >
                  <DocImage
                    src={coverageImg}
                    width={630}
                    height={307}
                    alt="Coverage curves over 800 seconds: the final model rises steeply and reaches 95 percent near 175 seconds, while nearest-frontier and Voronoi rise slowly and overlap until about 585 seconds."
                  />
                </DocFigure>
              </DocSubsection>
            </DocSection>

            {/* ------------------------------------------------------------------ 5 */}
            <DocSection id="deployment" number="5" title="Deployment and results in LOTUSim">
              <DocSubsection number="5.1" title="Integration">
                <P>
                  LOTUSim <Cite refs={[3]} /> combines ROS 2, Gazebo physics, PX4 software-in-the-loop vehicles and Unity rendering.
                  The trained actor file is loaded unchanged — the deployed file is byte-identical to the selected checkpoint — and
                  the surrounding pipeline is rebuilt for a realistic simulator:
                </P>
                <ul className="list-disc space-y-2 pl-5 marker:text-muted">
                  <li>
                    <Term>Sensing.</Term> A raycast sensor added to each UAV in Unity casts the same 5,402-ray pattern against the
                    scene's colliders and returns the ranges through a new ROS 2 interface (<code className="text-[0.92em]">RayScan</code>).
                    Only measurements are sent, never a map; each UAV builds its own map from them.
                  </li>
                  <li>
                    <Term>Decisions.</Term> Each UAV asks for a new target every 10 s or when it arrives. A shared exploration host
                    merges the maps and runs the policy, scoring and A* in the background while the UAVs keep flying (
                    <XRef href="#fig-8">Figure 8</XRef>).
                  </li>
                  <li>
                    <Term>Safer targets.</Term> Instead of flying onto the frontier itself, a UAV flies to a known-free viewpoint
                    next to it that does not border unknown space.
                  </li>
                  <li>
                    <Term>Flight.</Term> Routes are sent to PX4 as position setpoints at 10 Hz, capped at 2.5 m/s horizontally. If
                    a newly seen obstacle blocks the route, the UAV replans at once.
                  </li>
                </ul>
                <DocFigure
                  id="fig-8"
                  number={8}
                  caption="The deployment loop for one UAV, with time running downward. A: a scan request, the Unity raycast reply and the update of the UAV's own map. B: a decision request, scoring and A* planning by the shared host, and route execution through PX4 setpoints."
                >
                  <DocImage
                    src={sequenceImg}
                    width={1200}
                    height={1000}
                    alt="Sequence diagram with four lifelines: the Unity raycast sensor, the UAV task, the shared exploration host with its decision worker, and the PX4 SITL vehicle, showing the scan exchange and one exploration decision."
                  />
                </DocFigure>
                <DocTable
                  id="tab-6"
                  number={6}
                  caption="Main differences between the training simulator and LOTUSim."
                  head={['Aspect', 'Training simulator', 'LOTUSim']}
                  rows={[
                    ['Sensing', 'Exact rays against voxel obstacles', 'Unity raycasts against real colliders'],
                    ['Motion', 'Constant 2 m/s along voxel centres', 'PX4 multirotor dynamics, 2.5 m/s cap'],
                    ['Decision timing', 'All UAVs together, every 5 s', 'Each UAV every 10 s or on arrival'],
                    ['Targets', 'Frontier voxels', 'Safe viewpoints next to frontiers'],
                    ['Blocked route', 'Wait for the next decision', 'Replan immediately'],
                  ]}
                />
              </DocSubsection>

              <DocSubsection number="5.2" title="Minefield scenario">
                <P>
                  The test scenario places three PX4 X500 multirotors over open water in LOTUSim's offshore wind-farm scene. The{' '}
                  <M>{tex`125\times125\times24`}</M> m area contains 60 floating mines, modelled as 3.5 m boxes at different
                  heights. The UAVs take off side by side from the southern edge, climb to 15.5 m and explore until the team has
                  mapped 95% of the reachable free space, which is scored against the configured mine boxes.
                </P>
                <P>
                  The two baselines run through the same LOTUSim pipeline: nearest-frontier uses the same scoring code with{' '}
                  <M>{tex`\lambda=1`}</M>, and Voronoi assignment restricts each UAV to the frontiers in its own region. Each method
                  flew <Term>10 missions</Term> from the same starts. The scenario is fixed, but missions still differ, because
                  scans and decisions are asynchronous and their timing changes from run to run. Time is measured from the team's
                  first decision to the moment coverage reaches 95%.
                </P>
              </DocSubsection>

              <DocSubsection number="5.3" title="Results">
                <DocTable
                  id="tab-7"
                  number={7}
                  caption="Ten LOTUSim missions per method in the minefield scenario with three UAVs; every mission reached 95% coverage. SD is the standard deviation across missions. Mine-box entries count how often a UAV entered a configured mine box (a scoring check, not a crash)."
                  head={['Method', <>Mean <M>{tex`T_{95}`}</M> (SD)</>, 'Fastest – slowest', 'Distance flown', 'Mine-box entries']}
                  align={['left', 'right', 'right', 'right', 'right']}
                  rows={[
                    ['Nearest-frontier', '430.3 s (50.7)', '353.6 – 524.4 s', '1,734 m', '4 in 10 missions'],
                    ['Voronoi', '436.3 s (45.4)', '377.7 – 514.3 s', '1,725 m', '3 in 10 missions'],
                    [<strong key="final">Final model</strong>, <strong key="t95">203.0 s (23.4)</strong>, <strong key="range">179.0 – 260.5 s</strong>, <strong key="dist">988 m</strong>, '1 in 10 missions'],
                  ]}
                />
                <P>
                  The result seen in the lightweight simulator holds in LOTUSim. With Unity sensing and PX4 flight, the final
                  model mapped the minefield <Term>about 2.1 times faster</Term> than both baselines and flew about 43% less (
                  <XRef href="#tab-7">Table 7</XRef>). The two groups do not overlap: the slowest of the final model's 10 missions
                  (260.5 s) was still faster than the fastest baseline mission (353.6 s) (<XRef href="#fig-9">Figure 9</XRef>). The
                  final model's missions were also more consistent, with half the spread of either baseline.
                </P>
                <P>
                  <XRef href="#fig-10">Figure 10</XRef> shows why. Under the final model each UAV sweeps its own part of the field
                  in long, purposeful legs. Under nearest-frontier the UAVs keep stopping for the closest scrap of unknown space,
                  doubling back through areas that are already mapped, and the team needs many more decisions to finish (305
                  against 89 per mission on average).
                </P>
                <DocFigure
                  id="fig-9"
                  number={9}
                  caption="Time to map 95% of the minefield in each of the 10 LOTUSim missions per method (one dot per mission); the black bar is the mean."
                >
                  <DocImage
                    src={lotusimTrialsImg}
                    width={682}
                    height={225}
                    alt="Dot plot of ten missions per method. Final model between 179 and 261 seconds, mean 203. Nearest frontier between 354 and 524 seconds, mean 430. Voronoi between 378 and 514 seconds, mean 436."
                  />
                </DocFigure>
                <DocFigure
                  id="fig-10"
                  number={10}
                  caption="Flown paths in the first LOTUSim mission of each method, drawn from the mission recordings (x east, y north in LOTUSim's world frame). The dashed square is the 125 m × 125 m exploration area. “MAPPO run 013” in the left title is the final model."
                >
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <DocImage
                      src={lotusimTopFinalImg}
                      width={577}
                      height={471}
                      alt="Top-down paths of three UAVs under the final model: each sweeps its own part of the minefield; 95 percent in 184 seconds after 939 metres."
                    />
                    <DocImage
                      src={lotusimTopNearestImg}
                      width={577}
                      height={471}
                      alt="Top-down paths of three UAVs under nearest frontier: the paths wind back and forth and overlap; 95 percent in 439 seconds after 1,687 metres."
                    />
                  </div>
                </DocFigure>
              </DocSubsection>

              <DocSubsection number="5.4" title="More UAVs than in training">
                <P>
                  The actor sees its teammates through a single channel that marks all of their positions, so it does not depend on
                  how many teammates there are. The same policy, trained with three UAVs, was therefore also flown with four and
                  five (<XRef href="#fig-11">Figure 11</XRef>). Without retraining, the larger teams split the field between them
                  and reached 95% in 116 s with four UAVs and 129 s with five, against 170 s for a three-UAV mission of the same
                  session. Each team size was flown once, and repeated three-UAV missions already vary between 179 s and 261 s, so
                  these runs show that the policy carries over to larger teams, not how much faster each extra UAV makes the team.
                </P>
                <DocFigure
                  id="fig-11"
                  number={11}
                  caption="The same policy flown in LOTUSim with three, four and five UAVs (one mission each), drawn from the mission recordings. Titles give the time to 95% coverage and the distance flown by the whole team."
                >
                  <DocImage
                    src={lotusimTopTeamImg}
                    width={1432}
                    height={499}
                    alt="Three top-down maps of the minefield with three, four and five UAVs, each colour one UAV, finishing in 170, 116 and 129 seconds after 827, 704 and 875 metres."
                  />
                </DocFigure>
                <P>
                  <XRef href="#fig-12">Figure 12</XRef> replays the same three missions in 3D. The explored space is coloured by
                  the UAV that sensed it, so the way the team divides the field is visible as it happens.
                </P>
                <DocFigure
                  id="fig-12"
                  number={12}
                  caption="Replays of the recorded LOTUSim missions with three, four and five UAVs, sped up. Explored space is coloured by the UAV that sensed it; black blocks are the mines the team has detected; FINISHED appears at 95% coverage."
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {REPLAYS.map(({ uavs, src, poster }) => (
                      <div key={uavs}>
                        <video
                          controls
                          muted
                          loop
                          playsInline
                          preload="none"
                          poster={poster}
                          aria-label={`Replay of the LOTUSim mission with ${uavs} UAVs`}
                          className="aspect-square w-full bg-white object-contain"
                        >
                          <source src={src} type="video/mp4" />
                        </video>
                        <p className="mt-1 text-center text-xs text-muted">{uavs} UAVs</p>
                      </div>
                    ))}
                  </div>
                </DocFigure>
                <Remark title="What these results cover.">
                  LOTUSim missions are simulated: PX4 flies software-in-the-loop vehicles and Unity renders the sensing, but no
                  physical UAV has flown. The comparison covers one scenario, one start position and 10 repeats per method, and
                  maps are shared instantly through one host.
                </Remark>
              </DocSubsection>
            </DocSection>

            {/* ------------------------------------------------------------------ 6 */}
            <DocSection id="future-work" number="6" title="Future work in LOTUSim">
              <P>
                This work shows that a learned policy can make mission-level decisions inside LOTUSim, not only drive a
                vehicle. Two directions would build on that, using LOTUSim's aerial and underwater scenes.
              </P>
              <DocSubsection number="6.1" title="Object-goal exploration">
                <P>
                  In object-goal navigation <Cite refs={[19]} />, an agent is given a target object, explores an unseen area,
                  recognises the object with its onboard camera and moves to it. Chaplot et al. learn where to look next on a
                  semantic map built from the camera images, an approach that won the 2020 Habitat object-goal navigation challenge in indoor house scenes. Moving this idea into
                  LOTUSim's maritime and aerial scenes — for example, “find the drifting boat” or “find the mine closest to the
                  turbine” — would turn exploration from mapping everything into a goal-driven, vision-based mission, rather than
                  fixed patrol or waypoint missions. The same idea applies across domains: aerial, surface
                  and underwater vehicles.
                </P>
                <P>
                  <Term>What it needs.</Term> The method relies on depth to place what the camera sees on the map, so LOTUSim
                  would need a camera with depth (or a depth sensor) alongside the current LiDAR. Each new goal object also needs
                  labelled training images, which LOTUSim's Unity rendering could generate automatically.
                </P>
              </DocSubsection>
              <DocSubsection number="6.2" title="Underwater 3D mapping">
                <P>
                  SurfSLAM <Cite refs={[20]} /> builds an accurate 3D map of a shipwreck in real time with a BlueROV2. Camera depth
                  usually fails underwater because of murky water, poor lighting and plain surfaces. SurfSLAM addresses this by
                  training a stereo depth network on 105,600 simulated underwater images and then fine-tuning it on real footage;
                  the robot's motion sensors track its position, and the camera depth corrects their drift. It was tested on real
                  shipwrecks in Thunder Bay, USA, with more than 24,000 stereo image pairs.
                </P>
                <P>
                  LOTUSim already simulates underwater vehicles and scenes, so it could supply simulated training images of this
                  kind. Combining such a mapping pipeline with the exploration policy of this report would let an underwater
                  vehicle decide where to look next while it builds the map — the 3D exploration problem studied here, moved
                  below the surface.
                </P>
              </DocSubsection>
            </DocSection>

            {/* ------------------------------------------------------------------ 7 */}
            <DocSection id="limitations" number="7" title="Limitations">
              <ul className="list-disc space-y-2 pl-5 marker:text-muted">
                <li>
                  <Term>Trained outside LOTUSim.</Term> The policy learns in a simplified voxel world, so some LOTUSim effects
                  only appear at deployment. For example, mine surfaces cut through voxels, so partly filled voxels can be mapped
                  as obstacles and leave frontiers that cannot be resolved. A training simulator that matches LOTUSim more
                  closely, or training inside LOTUSim, is the main improvement to make.
                </li>
                <li>
                  <Term>One scenario.</Term> In LOTUSim the policy has been tested on one environment, the minefield, from one start
                  position. Offline, it was trained with one map size, obstacle density and team size.
                </li>
                <li>
                  <Term>Perfect communication.</Term> Maps are shared instantly through one host; delays, dropped messages and
                  onboard computing limits are not modelled.
                </li>
                <li>
                  <Term>Fixed input size.</Term> The policy reads a fixed <M>{tex`125\times125\times24`}</M> m volume; larger areas
                  need tiling or retraining.
                </li>
                <li>
                  <Term>A one-number action.</Term> A single weight can only choose among the best distance–gain trade-offs; it
                  cannot express goals such as “stay out of the area my teammate is heading to” directly. Actions that rank a
                  short list of candidates, or add teammate-aware terms to the score, are a natural extension.
                </li>
              </ul>
            </DocSection>

            {/* ------------------------------------------------------------------ 8 */}
            <DocSection id="conclusion" number="8" title="Conclusion">
              <P>
                This report adapted FA-MARL to cooperative 3D exploration with UAVs. The classical pipeline — voxel mapping,
                frontiers, clustering, scoring and A* — is kept, and a shared policy trained with MAPPO only chooses how each UAV
                trades travel distance against information gain. On 20 unseen maps in the training simulator, this single learned
                number lets three UAVs map 95% of the space about 3.3 times faster than nearest-frontier and Voronoi assignment.
                Run unchanged in LOTUSim with Unity sensing and PX4 flight, it finished the minefield mission about 2.1 times faster
                than both baselines over 10 missions each, and it also ran with four and five UAVs without retraining. The next
                steps are a training world that matches LOTUSim more closely, more scenarios, and goal-driven missions built on
                the same idea.
              </P>
              <p className="text-sm text-muted">
                Per-map results, map seeds and the recorded configurations of the offline benchmark are available in the{' '}
                <XRef href={`${DOWNLOADS}/evidence.json`}>benchmark data</XRef>.
              </p>
            </DocSection>

            <DocSection id="references" title="References">
              <ol className="space-y-3 text-sm leading-relaxed">
                {REFERENCES.map(({ id, content }) => (
                  <li key={id} id={`ref-${id}`} className="grid scroll-mt-28 grid-cols-[2.25rem_1fr]">
                    <span className="tabular-nums text-muted">[{id}]</span>
                    <span>{content}</span>
                  </li>
                ))}
              </ol>
            </DocSection>
          </div>
        </article>

        <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100dvh-7rem)] lg:space-y-6 lg:overflow-y-auto lg:pr-2">
          <SidebarCard title="Contents">
            <TableOfContents items={NAV_ITEMS} />
          </SidebarCard>
          <SidebarCard title="Downloads">
            <SidebarLinks links={LINKS} />
          </SidebarCard>
        </aside>
      </div>
    </div>
  );
}
