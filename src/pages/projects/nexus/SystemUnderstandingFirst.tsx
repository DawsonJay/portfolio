import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';

const SystemUnderstandingFirst = () => {
  return (
    <Article>
      <TitleBlock title="System Understanding First" />
      <TextBlock 
        text="I learned that Processing Threads (job producers) differ from Worker Threads (job consumers). DueCount is the key health metric. The dashboard shows patterns, not precise numbers."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="Before designing a single component, I spent significant time understanding the Job Manager system architecture. This wasn't optional—you can't design an effective dashboard without understanding what you're visualizing. The system is complex: a distributed job processing orchestrator managing 49 queue types across multi-tenant SaaS infrastructure, with multiple job entry points and a hierarchy of queues organized by application, deployment slot, queue type, customer instance, and priority level."
        sectionTitle="Understanding First"
      />
      <TextBlock 
        text="The most critical insight came from distinguishing two types of 'threads' that sound similar but serve completely different purposes. Processing Threads are job producers—named, event-driven components like 'EmailCampaignThread' or 'FileMonitorThread' that create jobs when events occur (file changes, schedules, webhooks). Worker Threads are job consumers—anonymous execution slots configured per queue (e.g., 'Send': 5, 'Mab': 3) that poll the dispatcher for jobs, execute work, and report completion. This distinction fundamentally shapes the UI: Processing Threads are about configuration and monitoring specific producers, while Worker Threads are about capacity allocation and throughput."
        sectionTitle="Two Types of Threads"
      />
      <TextBlock 
        text="I analyzed the JobDispatcher codebase and a 340,000-line status.json API response to understand the data model. The key metrics for dashboard health monitoring are DueCount (jobs ready to process right now—the primary health indicator), Count (total jobs including future), FutureCount (scheduled jobs), and ExecutionTime (milliseconds to complete). The status API provides hierarchical queue data, but the dashboard's purpose isn't to display precise numbers—it's to show visual patterns. Users need at-a-glance health monitoring: detecting high DueCount, spotting spikes, identifying idle periods, recognizing bottlenecks."
        sectionTitle="Data Model Analysis"
      />
      <TextBlock 
        text="This understanding shaped every design decision. The Overview page shows aggregate patterns across all queues, not detailed breakdowns. The Queues page groups by type and visualizes trends over time. The Operations page focuses on the single workflow where backend changes occur (configuring BusyLifetime, Active, and Sequential settings). The VM page shows which Job Managers are processing which queues and their health status. Each page answers specific questions that emerged from understanding the system's architecture and failure modes."
        sectionTitle="Design Decisions"
      />
      <TextBlock 
        text="The atomic notes I created during this analysis became the foundation for team knowledge. Twelve notes covering concepts like 'Job Dispatcher orchestrates distributed job processing,' 'Processing Threads create jobs from events,' 'Queue metrics indicate system health,' and 'Dashboard shows visual patterns not precise data.' These notes aren't just documentation—they're the shared understanding that enables the entire team to make informed decisions about the UI. You can't build effective enterprise software without this depth of system understanding. The time I invested in analysis pays dividends in every design decision that follows."
        sectionTitle="Team Knowledge"
      />
      
      <TextBlock 
        text="This deep system analysis demonstrates my approach to enterprise software: understanding before building. I spent significant time analyzing a 340,000-line API response and the JobDispatcher codebase before writing a single component. This upfront investment prevented costly redesigns later and ensured the dashboard actually solved real problems. The distinction between Processing Threads and Worker Threads fundamentally shaped the UI architecture—without this understanding, I would have built the wrong interface. This shows I can work with complex legacy systems, extract key insights from large codebases, and design solutions that match system architecture rather than fighting against it."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default SystemUnderstandingFirst;
