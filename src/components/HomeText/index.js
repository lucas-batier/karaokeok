import {Typography, useTheme} from "@mui/material";

function HomeText() {
    const theme = useTheme();

    return (
        <>
            <Typography variant={"h5"} paragraph>
                L'application&nbsp;
                <Typography variant={"h5"} component={"span"} color={theme.palette.primary.main}>
                    communautaire
                </Typography>
                &nbsp;avec des&nbsp;
                <Typography variant={"h5"} component={"span"} color={theme.palette.primary.main}>
                    karaokes vérifiés
                </Typography>
                &nbsp;!
            </Typography>
            <Typography paragraph ml={1} mb={3} fontSize={18}>
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
