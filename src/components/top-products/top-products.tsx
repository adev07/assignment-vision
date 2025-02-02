import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface Product {
    product: string;
    soldAmount: number;
    unitPrice: number;
    revenue: number;
    rating: number;
}


interface TopProductsProps {
    data: Product[];
}

export function TopProducts({ data }: TopProductsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Products</CardTitle>
                <Button variant="ghost" size="sm">
                    Full results
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Sold amount</TableHead>
                            <TableHead>Unit price</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product.product}</TableCell>
                                <TableCell>{product.soldAmount}</TableCell>
                                <TableCell>${product.unitPrice}</TableCell>
                                <TableCell>${product.revenue}</TableCell>
                                <TableCell>⭐ {product.rating}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
