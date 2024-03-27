namespace App {
    export interface Dragabble {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }
    
    export interface DragTarget {
        dragOverHandler(event: DragEvent): void // allows dropping
        dropHandler(event: DragEvent): void // handle the drop and update data
        dragLeaveHandler(event: DragEvent): void // what happens after dropping
    }
}