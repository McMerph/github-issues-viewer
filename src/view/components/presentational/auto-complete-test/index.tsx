import * as React from "react";
import { FormEvent } from "react";
import * as Autocomplete from "react-autocomplete";

interface IProps {
  items: string[];
}

interface IState {
  value: string;
}

interface IItem {
  key: number;
  value: string;
}

export default class AutoCompleteTest extends React.PureComponent<IProps, IState> {

  public constructor(props: Readonly<IProps>) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = { value: "" };
  }

  public render(): React.ReactNode {
    const items: IItem[] = this.props.items.map((value, index) => ({
      key: index,
      value,
    }));

    return (
      <Autocomplete
        items={items}
        shouldItemRender={this.shouldItemRender}
        getItemValue={this.getItemValue}
        renderItem={this.renderItem}
        value={this.state.value}
        onChange={this.onChange}
        onSelect={this.onSelect}
      />
    );
  }

  private renderItem(item: IItem, highlighted: boolean): React.ReactNode {
    return (
      <div
        key={item.key}
        style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
      >
        {item.value}
      </div>
    );
  }

  private shouldItemRender(item: IItem, value: string): boolean {
    return item.value.toLowerCase().indexOf(value.toLowerCase()) > -1;
  }

  private getItemValue(item: IItem): string {
    return item.value;
  }

  private onChange(event: FormEvent<HTMLInputElement>): void {
    this.setState({ value: event.currentTarget.value });
  }

  private onSelect(value: string): void {
    this.setState({ value });
  }

}
