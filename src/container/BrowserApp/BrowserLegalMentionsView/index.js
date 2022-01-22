import React from "react";
import BrowserApp from "../index";
import LegalMentionsView from "../../../components/LegalMentionsView";


function BrowserLegalMentionsView() {
    return (
        <BrowserApp title={"Mentions légales"}>
            <LegalMentionsView />
        </BrowserApp>
    );
}

export default BrowserLegalMentionsView;
