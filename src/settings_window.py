from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
import copy
# User defined imports
from src.settings_file import write_settings, default_settings


class SettingsWindow(QWidget):
    def __init__(self, main_window, parent=None):
        super().__init__(parent=parent)
        self.main_window = main_window
        self.temp_data = copy.deepcopy(self.main_window.settings)
        self.setWindowTitle("Settings")
        self.setWindowIcon(QIcon(r"..\appData\settings_icon"))
        layout = QFormLayout()
        self.setLayout(layout)
        for key, value in self.temp_data.items():
            name = QLabel()
            name.setText(key)
            if isinstance(value, bool):
                widget = QComboBox(self, objectName=key)
                widget.addItems(["True", "False"])
                widget.setCurrentText(str(value))
                widget.currentIndexChanged.connect(self.selection_change)
            elif "color" in key:
                widget = QPushButton(key)
                widget.setStyleSheet(f"background-color: {value}")
                widget.clicked.connect(self.change_color)
            else:
                widget = QLabel()
                widget.setText(str(value))
            layout.addRow(name, widget)
        reset_button = QPushButton("Reset")
        reset_button.clicked.connect(self.reset)
        cancel_button = QPushButton("Cancel")
        cancel_button.clicked.connect(self.cancel)
        apply_button = QPushButton("Apply")
        apply_button.clicked.connect(self.apply)
        layout.addWidget(reset_button)
        layout.addRow(cancel_button, apply_button)

    def selection_change(self):
        sender = self.sender()
        if isinstance(self.temp_data[sender.objectName()], bool):
            self.temp_data[sender.objectName()] = True if sender.currentText() == "True" else False
        else:
            self.temp_data[sender.objectName()] = bool(sender.currentText())

    def change_color(self):
        color = QColorDialog.getColor()
        if color.isValid():
            sender = self.sender()
            self.temp_data[sender.text()] = color.name()
            sender.setStyleSheet(f"background-color: {color.name()}")

    def reset(self):
        self.temp_data = default_settings()
        self.apply()

    def cancel(self):
        self.close()

    def apply(self):
        # todo:
        filename = r"..\appData\settings.json"
        write_settings(self.temp_data, filename)
        self.main_window.settings = self.temp_data
        self.main_window.change_ui()
        self.main_window.status_bar.showMessage("Settings changed.", 1000)
        self.close()
