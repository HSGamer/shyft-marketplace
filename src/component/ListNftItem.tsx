import {ListedNftDetail} from "@shyft-to/js";
import {Badge, Card, Group, Image, ScrollArea, Text} from "@mantine/core";
import {BuyButton} from "./BuyButton.tsx";

type ListNftItemProps = {
    nftDetail: ListedNftDetail
}

export function ListNftItem({nftDetail}: ListNftItemProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={nftDetail.nft.image_uri}
                    height={160}
                    alt={nftDetail.nft.name}
                    fit="contain"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{nftDetail.nft.name}</Text>
                <Badge color="pink" variant="light">
                    {nftDetail.price} SOL
                </Badge>
            </Group>

            <ScrollArea h={100}>
                <Text size="sm" color="dimmed">
                    {nftDetail.nft.description}
                </Text>
            </ScrollArea>

            <BuyButton nftDetail={nftDetail} />
        </Card>
    )
}