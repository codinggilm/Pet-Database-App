import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { PageSize } from "../../config/config";

@Component({
    selector: 'app-pagination',
    imports: [],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

export class PaginationComponent implements OnInit, OnChanges {

    @Input() userCount!: number;
    @Output() selectedPage: EventEmitter<number> = new EventEmitter();
    @Output() previousPage = new EventEmitter();
    @Output() nextPage = new EventEmitter();

    pages!: number[];
    pageSize = PageSize;

    constructor() {}

    ngOnInit(): void {
        this.getPageCount(this.userCount);
    }

    ngOnChanges(changes: SimpleChanges) {
		if (changes['userCount'] && changes['userCount'].previousValue != changes['userCount'].currentValue) {
			this.getPageCount(this.userCount);
		}
	}

    getPageCount(userCount: number): number[] {
        let pages = Math.ceil(userCount / this.pageSize);
        let pagesArray = [];
        for (let i=0; i < pages; i++) {
            pagesArray.push(i + 1)
        }
        return this.pages = pagesArray;
    }

    goToSelectedPage(pageIndex: number) {
        this.selectedPage.emit(pageIndex + 1);
    }

    goToPreviousPage() {
        this.previousPage.emit();
    }

    goToNextPage() {
        this.nextPage.emit();
    }
}