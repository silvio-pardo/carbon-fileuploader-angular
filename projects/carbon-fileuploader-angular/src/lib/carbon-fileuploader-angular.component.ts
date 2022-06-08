import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FileItemImage } from './carbon-fileuploader-angular-types';

@Component({
  selector: 'lib-carbon-fileuploader-angular',
  template: `
    <div>
    <label [for]="fileUploaderId" class="bx--file--label">{{title}}</label>
    <p class="bx--label-description">{{description}}</p>
    <div class="bx--file">
        <!-- drop container -->
        <label
            *ngIf="drop"
            class="bx--file-browse-btn"
            (keyup.enter)="fileInput.click()"
            (keyup.space)="fileInput.click()"
            [ngClass]="{'bx--file-browse-btn--disabled': disabled}"
            tabindex="0">
            <div
                class="bx--file__drop-container bx--file-drop-override"
                [ngClass]="{'bx--file__drop-container--drag-over': dragOver}"
                role="button"
                (click)="fileInput.click()"
                [attr.for]="fileUploaderId"
                (dragover)="onDragOver($event)"
                (dragleave)="onDragLeave($event)"
                (drop)="onDrop($event)">
                <ng-container>
                    {{dropText}}
                </ng-container>
            </div>
        </label>
        <!-- add file button-->
        <button
            *ngIf="!drop"
            type="button"
            ibmButton="primary"
            (click)="fileInput.click()"
            [attr.for]="fileUploaderId"
            [disabled]="disabled">
            {{buttonText}}
        </button>

        <input
            #fileInput
            type="file"
            class="bx--file-input"
            [accept]="accept"
            [id]="fileUploaderId"
            [multiple]="multiple"
            tabindex="-1"
            (change)="onFilesAdded()"
            [disabled]="disabled"/>
        <div class="bx--file-container">
            <ng-container *ngFor="let fileItem of filesCollection">
                <div ibmGrid class="file-item-box">
                    <div ibmRow class="text-image-row">
                        <div ibmCol><p>{{fileItem.file.name}}</p></div>
                        <div ibmCol (click)="removeFile(fileItem)">
                            <ibm-icon-trash-can size="24" class="icon-delete"></ibm-icon-trash-can>
                        </div>
                    </div>
                    <div ibmRow>
                        <img class="image-preview" src="{{fileItem.srcUrl}}">
                    </div>
                </div>
                
                <div *ngIf="fileItem.invalid" class="bx--form-requirement">
                    {{fileItem.invalidText}}
                </div>
            </ng-container>
        </div>
      </div>
  </div>`,
  styles: ['.image-preview{ width: 100%;}',
  '.file-item-box{ background-color: #8d8d8d ; padding: 0; }',
  '.icon-delete{float: right;}',
  '.text-image-row{padding: 12px;}',
  '.bx--file-drop-override{border: 1px dashed #8d8d8d !important;padding: 4px;}'
]
})
export class CarbonFileuploaderAngularComponent {

  @ViewChild("fileInput", { static: false }) fileInput: any | undefined;
  filesCollection: Array<FileItemImage> = [];
  @Input() fileUploaderId = '0';
  @Input() buttonText: string = "Add File";
  @Input() title!: string;
  @Input() description!: string;
  @Input() accept: Array<string> = [];
  @Input() multiple = true;
  @Input() drop = true;
  @Input() dropText: string = "Drop file in this box.";
  @Input() disabled = false;

  public dragOver = false;

  createFileItem(file: File): FileItemImage {
		return {
			uploaded: false,
			state: "edit",
			invalid: false,
			invalidText: "",
			file: file
		} as FileItemImage;
	}
  getImage(item: FileItemImage){
    const reader = new FileReader();
    reader.onload = () => {
      item.srcUrl = reader.result as string;
      this.filesCollection.push(item)
    };
    reader.onerror = () => {
      alert('unable to load file!');
    };
    reader.onabort = () => {
      alert('abort operation!');
    };
    reader.readAsDataURL(item.file);
  }

  onDragOver(event: any) {
		event.stopPropagation();
		event.preventDefault();
		this.dragOver = true;
	}

	onDragLeave(event: any) {
		event.stopPropagation();
		event.preventDefault();
		this.dragOver = false;
	}

  removeFile(item: FileItemImage) {
    this.filesCollection = this.filesCollection.filter((value) => value !== item);
	}

  onDrop(event: any) {
		event.stopPropagation();
		event.preventDefault();
		const transferredFiles = Array.from(event.dataTransfer.files);
		transferredFiles.filter(({ name, type } : any) => {
			// Get the file extension and add a "." to the beginning.
			const fileExtension = name.split(".").pop().replace(/^/, ".");
			// Check if the accept array contains the mime type or extension of the file.
			return this.accept.includes(type) || this.accept.includes(fileExtension) || !this.accept.length;
		}).forEach(file => {
      if(this.multiple){
        this.getImage(this.createFileItem(file as File));
      }
		});
		this.dragOver = false;
	}
  onFilesAdded() {
		if (!this.multiple) {
			this.filesCollection = [];
		}
    Array.from(this.fileInput?.nativeElement.files).forEach((file) => {
      this.getImage(this.createFileItem(file as File));
		})
	}
}
