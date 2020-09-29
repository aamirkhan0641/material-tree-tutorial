
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';


interface TreeData {
  title: string;
  id: string;
  subCategories?: TreeData[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;

  /**
   *
   */
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource<TreeData>();
    const url = 'http://208.109.13.111:9090/api/Category';
    this.http.get(url).subscribe((data: any) => (
      this.nestedDataSource.data = data.result
    ));
  }

  getChildren = (node: TreeData) => observableOf(node.subCategories);
  hasNestedChild = (_: number, nodeData: TreeData) => {
    return !!nodeData.subCategories && nodeData.subCategories.length > 0;


  }
  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = null;
    this.nestedDataSource.data = data;
  }
}

  // refreshTreeData() {
  //   const data = this.nestedDataSource.data;
  //   this.nestedDataSource.data = null;
  //   this.nestedDataSource.data = data;
  // }

  // addNode(node: TreeData) {
  //   node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
  //   this.nestedDataSource.data.push(node);
  //   this.refreshTreeData();
  // }

  // addChildNode(childrenNodeData) {
  //   childrenNodeData.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
  //   childrenNodeData.currentNode.Children.push(childrenNodeData.node);
  //   this.refreshTreeData();
  // }



  // editNode(nodeToBeEdited) {
  //   const fatherElement: TreeData = this.service.findFatherNode(nodeToBeEdited.currentNode.Id, this.nestedDataSource.data);
  //   let elementPosition: number;
  //   nodeToBeEdited.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
  //   if (fatherElement[0]) {
  //      fatherElement[0].Children[fatherElement[1]] = nodeToBeEdited.node;
  //  } else {
  //      elementPosition = this.service.findPosition(nodeToBeEdited.currentNode.Id, this.nestedDataSource.data);
  //      this.nestedDataSource.data[elementPosition] = nodeToBeEdited.node;
  //  }
  //   this.refreshTreeData();
  // }



  // deleteNode(nodeToBeDeleted: TreeData) {
  //   const deletedElement: TreeData = this.service.findFatherNode(nodeToBeDeleted.Id, this.nestedDataSource.data);
  //   let elementPosition: number;
  //   if (window.confirm('Are you sure you want to delete ' + nodeToBeDeleted.Name + '?' )) {
  //       if (deletedElement[0]) {
  //         deletedElement[0].Children.splice(deletedElement[1], 1);
  //       } else {
  //         elementPosition = this.service.findPosition(nodeToBeDeleted.Id, this.nestedDataSource.data);
  //         this.nestedDataSource.data.splice(elementPosition, 1);
  //     }
  //     this.refreshTreeData();
  //   }
//   }


// }
