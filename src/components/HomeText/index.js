import {Typography} from "@mui/material";

function HomeText() {
    return (
        <>
            <Typography variant={"h6"} paragraph fontWeight={900}>
                L'application communautaire avec des karaokes vérifiés !
            </Typography>
            <Typography paragraph ml={1} mb={3} textAlign={"justify"}>
                - Accéder à une bibliothèque de presque 300 karaokes vérifiés<br/>
                - Proposer de nouveaux karaokes qui seront validés par l'équipe<br/>
                - Créer tes playlist pour préparer tes soirées&nbsp;
                <Typography component={"span"} fontStyle={"italic"}>
                    (disponible au printemps)
                </Typography>
            </Typography>
        </>
    )
}

export default HomeText;
