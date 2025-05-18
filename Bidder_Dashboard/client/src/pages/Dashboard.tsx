import { useEffect } from "react";
import Header from "@/components/Header";
import WelcomeCard from "@/components/WelcomeCard";
import TenderListCard from "@/components/TenderListCard";
import QuotesCard from "@/components/QuotesCard";
import TenderNotificationCard from "@/components/TenderNotificationCard";
import MapCard from "@/components/MapCard";
import BeeTasksCard from "@/components/BeeTasksCard";
import AnalyticsCard from "@/components/AnalyticsCard";
import WinRateCard from "@/components/WinRateCard";
import QuotesSummaryCard from "@/components/QuotesSummaryCard";
import SpendingCard from "@/components/SpendingCard";
import DisputeCard from "@/components/DisputeCard";
import TendersPickUpCard from "@/components/TendersPickUpCard";
import SiteMeetingsCard from "@/components/SiteMeetingsCard";
import TendersDueCard from "@/components/TendersDueCard";
import BidOpeningsCard from "@/components/BidOpeningsCard";
import SmartContractsCard from "@/components/SmartContractsCard";
import SubmittedTendersCard from "@/components/SubmittedTendersCard";
import ActiveBeeTasksCard from "@/components/ActiveBeeTasksCard";
import BidBeesAIChat from "@/components/BidBeesAIChat";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  // Fetch dashboard data from the API
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/dashboard'],
  });

  // Set the page title
  useEffect(() => {
    document.title = "BidderBuddy Dashboard";
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <div className="text-text-primary text-xl">Loading dashboard...</div>
      </div>
    );
  }

  const userData = dashboardData?.user || {
    name: "Thabo",
    profileComplete: 75,
    winStreak: 3
  };

  const tenderData = dashboardData?.tender || {
    title: "Construction in Eastern Cape",
    status: "70 Mid",
    issuer: "30",
    winChance: 80,
    lagngiacts: "arore",
    competitor: "Competitor #75.9 won 5 similar tenders"
  };

  const quoteData = dashboardData?.quote || {
    id: "4156",
    amount: "R10,000",
    delayIncrease: "1%",
    submissionId: "709",
    submissionRisk: "high risk!",
    supplierRisk: "Risk"
  };

  const mapMarkers = dashboardData?.mapMarkers || [
    { lng: 22.9375, lat: -28.7282, type: 'green', popupText: 'Western Cape Opportunity' },
    { lng: 24.9923, lat: -29.1007, type: 'yellow', popupText: 'Eastern Cape Project' },
    { lng: 28.2293, lat: -25.7479, type: 'red', popupText: 'Gauteng Tender - Critical' },
    { lng: 29.4627, lat: -23.8978, type: 'green', popupText: 'Limpopo, view this RFQ' },
    { lng: 18.4241, lat: -33.9249, type: 'yellow', popupText: 'Cape Town Infrastructure' },
    { lng: 31.0218, lat: -29.8587, type: 'orange', popupText: 'Durban Commercial Building' },
  ];

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header userName={userData.name} profileComplete={userData.profileComplete} />

      <div className="px-4 pb-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Column 1 (Left) */}
        <div className="lg:col-span-3 space-y-4">
          <WelcomeCard userName={userData.name} winStreak={userData.winStreak} progress={userData.profileComplete} />
          <TenderListCard tender={tenderData} />
          <QuotesCard quote={quoteData} />
          <TendersPickUpCard />
        </div>

        {/* Column 2 (Center) */}
        <div className="lg:col-span-6 space-y-4">
          <TenderNotificationCard profileComplete={userData.profileComplete} />
          <MapCard markers={mapMarkers} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BeeTasksCard />
            <AnalyticsCard />
          </div>
          
          <SiteMeetingsCard />
          <TendersDueCard />
        </div>

        {/* Column 3 (Right) */}
        <div className="lg:col-span-3 space-y-4">
          <WinRateCard />
          <QuotesSummaryCard />
          <SpendingCard />
          <DisputeCard />
          <ActiveBeeTasksCard />
          <SmartContractsCard />
          <SubmittedTendersCard />
          <BidOpeningsCard />
        </div>
      </div>
      
      <BidBeesAIChat />
    </div>
  );
}
