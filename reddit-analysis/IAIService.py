from abc import ABC, abstractmethod

class IAIService(ABC):
    def __init__(self):
        super().__init__()
        self.total_tokens_used = 0
    
    @abstractmethod
    def is_submission_advice_seeking(self, submission_text) -> bool:
        pass