import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { componentType } from '../types/component';
import { currentBudget } from '../utils/helpers';

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
  },
  row: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
  },
  meta: {
    color: '#555',
  },
  total: {
    marignTop: 20,
    fontSize: 16,
  },
});

export default function InventoryPDF({ items }: { items: componentType[] }) {
  const total = currentBudget(items).currentItemsPrice;

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={styles.title}>Current PC Inventory</Text>
        {items.map(item => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>Category: {item.category}</Text>
            <Text style={styles.meta}>Price: ${item.price}</Text>
          </View>
        ))}
        <Text style={styles.total}>Total: ${total}</Text>
      </Page>
    </Document>
  );
}
