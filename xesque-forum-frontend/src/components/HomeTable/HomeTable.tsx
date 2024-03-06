import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { tableData } from "./TableData";

export default function HomeTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={10}>
            Bem-vindo ao Fórum do Xesque, deixe a arte te guiar
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Última postagem</TableHead>
          <TableHead className="text-right">Número de postagens</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data) => (
          <TableRow key={data.name}>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.description}</TableCell>
            <TableCell>{data.lastUpdate}</TableCell>
            <TableCell align="right">{data.numberOfPosts}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
