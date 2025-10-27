import { HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyRequestServices } from "src/app/shared/service/request/cong-ty/cong-ty-request.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
    selector: 'them-sua-cong-ty',
    templateUrl: './them-sua-cong-ty.component.html',
    standalone: false
})
export class ThemSuaCongTyModal implements OnInit {
    @Input() data: any;
    @Input() mode = 'add';
    form: FormGroup;
    activeTab: number = 1;
    
    // Ngày hiện tại dùng để tính toán (định dạng YYYY-MM-DD)
    currentDate: Date = new Date();

    constructor(
        private fb: FormBuilder,
        private modal: NgbActiveModal,
        private toast: ToastService,
        private apiCompany: CompanyRequestServices,
        private spinner: SpinnerService
    ) {
        // --- KHỞI TẠO FORM VỚI TẤT CẢ CÁC TRƯỜNG DỮ LIỆU ĐẦY ĐỦ ---
        this.form = this.fb.group({
            // === TAB 1: Thông tin cơ bản ===
            name: ["", { validators: [Validators.required], updateOn: 'change' }],
            taxCode: ["", { validators: [Validators.required, Validators.pattern(/^[0-9]+$/)], updateOn: 'change' }],
            phone: ["", { validators: [Validators.pattern(/^[0-9]+$/)], updateOn: 'change' }],
            address: ["", { validators: [Validators.required], updateOn: 'change' }],
            
            code: [null],
            shortName: [null],
            establishedDate: [null],
            representativeName: [null],
            director: [null],
            chiefAccountantName: [null],
            taxDepartmentName: [null],
            email: [null, [Validators.email]],
            businessField: [null],
            note: [null],
            status: [1], 
            hasArising: [null],
            totalZaloLink: [null],

            // === TAB 2: Phân công & Kế toán ===
            accountant: [null],
            supporter: [null],
            generalAccountant: [null],
            collaborator: [null],

            // === TAB 3: Truy cập & Hóa đơn ===
            electronicTaxPassword: [null],
            electronicOrderPassword: [null],
            // Trường này cần theo dõi sự thay đổi
            digitalSignatureExpiryDate: [null], 
            // Trường này sẽ được tự động tính toán
            remainingDays: [{value: null, disabled: this.mode !== 'add' && this.mode !== 'edit'}], 
            invoiceLink: [null],
            invoiceUsername: [null],
            invoicePassword: [null],
            invoicePurchasedCount: [null],
            invoiceUsedCount: [null],
            invoiceRemainingCount: [null],
            invoiceStatus: [0], 

            // === TAB 4: Ngân hàng & Bảo hiểm ===
            insuranceLink: [null],
            insuranceUsername: [null],
            insurancePassword: [null],
            bankInfo1: [null],
            bankInfo2: [null],
            bankInfo3: [null],
            bankInfo4: [null],
            bankInfo5: [null],
        });
    }

    ngOnInit(): void {
        if (this.data) {
            this.form.patchValue(this.data);
        }
        
        // Thiết lập tính toán ngày còn lại
        this.setupDateCalculation();

        if (this.mode === 'view') {
            this.form.disable();
        } else {
            // Khi ở chế độ thêm/sửa, cho phép chỉnh sửa các trường
            // Ngoại trừ 'remainingDays' sẽ bị disable (vì nó là trường tính toán)
            this.form.get('remainingDays')?.disable();
        }
    }

    /**
     * Thiết lập theo dõi sự thay đổi của ngày hết hạn CKS và tính toán lại số ngày còn lại.
     */
    setupDateCalculation(): void {
        const expiryDateControl = this.form.get('digitalSignatureExpiryDate');
        const remainingDaysControl = this.form.get('remainingDays');
        
        if (expiryDateControl && remainingDaysControl) {
            expiryDateControl.valueChanges.subscribe(expiryDateString => {
                if (expiryDateString) {
                    try {
                        const expiryDate = new Date(expiryDateString);
                        // Đặt giờ cho ngày hiện tại về 00:00:00 để đảm bảo tính toán chính xác
                        const today = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
                        
                        // Tính toán sự khác biệt theo mili giây
                        const diffTime = expiryDate.getTime() - today.getTime();
                        
                        // Chuyển đổi mili giây sang ngày (1000ms * 60s * 60min * 24h)
                        // Công thức: (Ngày Hạn CKS - Ngày Hiện tại) / (miligiây trong 1 ngày)
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        
                        // Cập nhật giá trị vào trường 'remainingDays'
                        // Sử dụng 'patchValue' với { emitEvent: false } để tránh vòng lặp vô hạn
                        remainingDaysControl.patchValue(diffDays, { emitEvent: false });

                    } catch (e) {
                        // Nếu định dạng ngày không hợp lệ, xóa giá trị
                        remainingDaysControl.patchValue(null, { emitEvent: false });
                    }
                } else {
                    remainingDaysControl.patchValue(null, { emitEvent: false });
                }
            });
        }
    }

    submitForm() {
        if (this.form.invalid) {
            Object.values(this.form.controls).forEach((control) => {
                control.markAsDirty();
                control.updateValueAndValidity();
            });
            this.toast.warning('Vui lòng điền đầy đủ và chính xác các trường bắt buộc.');
            return;
        }

        // Lấy tất cả giá trị, bao gồm cả các trường bị disable (như remainingDays)
        const payload: any = this.form.getRawValue();

        this.spinner.show();
        
        if (this.mode === 'add' || !this.data) {
            // Logic THÊM MỚI
            this.apiCompany.create(payload).then((res: HttpResponse<any>) => {
                if (res.body?.code === 200) {
                    this.toast.success('Thêm mới công ty thành công');
                    this.closeModal(true);
                } else {
                    this.toast.error(res.body?.message || "Có lỗi xảy ra, vui lòng thử lại");
                }
            })
            .catch((err) => {
                this.toast.error(err.error?.message || "Lỗi kết nối hoặc server.");
            })
            .finally(() => this.spinner.hide());
        } else {
            // Logic CẬP NHẬT (mode === 'edit')
            payload.id = this.data.id;
            this.apiCompany.update(payload).then((res: HttpResponse<any>) => {
                if (res.body?.code === 200) {
                    this.toast.success('Thay đổi thông tin công ty thành công');
                    this.closeModal(true);
                } else {
                    this.toast.error(res.body?.message || "Có lỗi xảy ra, vui lòng thử lại");
                }
            })
            .catch((err) => {
                this.toast.error(err.error?.message || "Lỗi kết nối hoặc server.");
            })
            .finally(() => this.spinner.hide());
        }
    }
    
    closeModal(isReturn = null) {
        this.modal.close(isReturn);
    }
}