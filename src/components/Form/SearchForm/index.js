import {useCallback} from "react";
import {Box, Divider, IconButton, InputBase, Paper, useTheme} from "@mui/material";
import {ClearRounded, SearchRounded} from "@mui/icons-material";


function SearchForm({searchText, onSearchTextChange, onSearchSubmit}) {
    const theme = useTheme();

    const onSubmit = useCallback(
        (evt) => {
            evt.preventDefault();

            onSearchSubmit(searchText);
        },
        [onSearchSubmit, searchText]
    );

    return (
        <form onSubmit={onSubmit}>
            <Paper style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingBottom: theme.spacing(1),
                paddingTop: theme.spacing(1),
                paddingRight: theme.spacing(1),
                paddingLeft: theme.spacing(3),
                borderRadius: theme.shape.borderRadius,
            }}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <InputBase
                        name='search'
                        value={searchText || ''}
                        onChange={evt => { onSearchTextChange(evt.target.value); }}
                        style={{width: "100%"}}
                        placeholder={'Artiste ou musique...'}
                    />
                    {searchText && (
                        <>
                            <IconButton
                                onClick={() => { onSearchTextChange(''); }}
                                style={{marginRight: theme.spacing(1)}}
                            >
                                <ClearRounded />
                            </IconButton>
                            <Divider orientation={"vertical"} flexItem />
                        </>
                    )}
                    <IconButton
                        type="submit"
                        value={searchText}
                        disabled={searchText === ''}
                        style={{marginLeft: theme.spacing(1)}}
                    >
                        <SearchRounded />
                    </IconButton>
                </Box>
            </Paper>
        </form>
    )
}

export default SearchForm;
