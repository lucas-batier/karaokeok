import React from "react";
import LegalMentionsView from "../../../components/LegalMentionsView";
import MobileApp from "../index";


function MobileLegalMentionsView() {
    return (
        <MobileApp title={"Mentions légales"}>
            <LegalMentionsView />
        </MobileApp>
    );
}

export default MobileLegalMentionsView;
