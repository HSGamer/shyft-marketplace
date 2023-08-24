import {ListNft} from "./component/ListNft.tsx";
import {Box} from "@mantine/core";
import {ScrollAffix} from "./component/ScrollAffix.tsx";

export function Content() {
    return <Box mx={5} mt={5} mb={5}>
        <ListNft/>

        <ScrollAffix/>
    </Box>;
}