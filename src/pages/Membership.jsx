import { useContext, useEffect } from "react";
import BecomeMember from "../components/Membership/BecomeMembber/BecomeMember";
import MembershipTypes from "../components/Membership/MembershipTypes/MembershipTypes";
import MembershipHeader from "../components/Membership/MembershipHeader/MembershipHeader";
import Services from "../components/Membership/Services/Services";
import { DataContext } from "../apis/context/SiteDataContext";

const Membership = () => {
  const { getComponentValue, isPending, ResetPageName } = useContext(DataContext);

  useEffect(() => {
    ResetPageName("membership");
  }, []);

  return (
    <>
      <MembershipHeader title={"membership"} />
      <BecomeMember
        configData={getComponentValue("membership_page")}
        pending={isPending}
      />
      <MembershipTypes
        title={"individual"}
        subTitle={"Membership individual"}
      />
      <Services />
    </>
  );
};

export default Membership;
